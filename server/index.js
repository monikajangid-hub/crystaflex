import 'dotenv/config'
import { timingSafeEqual } from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { z } from 'zod'
import { sendInquiryNotification } from './lib/mailer.js'
import Inquiry from './models/Inquiry.js'

const app = express()
const port = Number(process.env.PORT) || 5000
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
const inquiryStatuses = ['new', 'contacted', 'qualified', 'closed']

app.disable('x-powered-by')
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
        connectSrc: ["'self'"],
      },
    },
  }),
)
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '10kb' }))

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many inquiries. Please try again in a little while.' },
})

const inquiryInput = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  service: z.enum([
    'Enterprise Email Solutions',
    'Web & Mobile App Development',
    'Google Cloud Platform (GCP)',
    'Microsoft Azure',
  ]),
  message: z.string().trim().min(10).max(3000),
})

const statusInput = z.object({ status: z.enum(inquiryStatuses) })

function requireDatabase(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Inquiry storage is temporarily unavailable. Please email sales@crystaflex.com.' })
  }
  return next()
}

function requireAdmin(req, res, next) {
  const expected = process.env.API_ADMIN_KEY
  const supplied = req.get('x-admin-key')

  if (!expected) {
    return res.status(503).json({ message: 'Inquiry management is not configured.' })
  }

  const expectedBuffer = Buffer.from(expected)
  const suppliedBuffer = Buffer.from(supplied || '')
  if (expectedBuffer.length !== suppliedBuffer.length || !timingSafeEqual(expectedBuffer, suppliedBuffer)) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  return next()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.post('/api/contact', inquiryLimiter, requireDatabase, async (req, res) => {
  const parsed = inquiryInput.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Please check the form and try again.',
      errors: parsed.error.issues.map(({ path: field, message }) => ({ field: field.join('.'), message })),
    })
  }

  const inquiry = await Inquiry.create(parsed.data)

  try {
    await sendInquiryNotification(inquiry)
    inquiry.notificationStatus = 'sent'
    inquiry.notifiedAt = new Date()
    await inquiry.save()
    return res.status(201).json({
      message: 'Inquiry received and sent to the Crystaflex sales team.',
      notificationSent: true,
    })
  } catch (error) {
    inquiry.notificationStatus = 'failed'
    await inquiry.save()
    console.error('Could not send inquiry notification:', error.message)
    return res.status(202).json({
      message: 'Your inquiry was saved, but the sales email could not be sent. Please email sales@crystaflex.com directly.',
      notificationSent: false,
    })
  }
})

app.get('/api/inquiries', requireAdmin, requireDatabase, async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 25))
  const filter = {}

  if (req.query.status) {
    if (!inquiryStatuses.includes(req.query.status)) {
      return res.status(400).json({ message: 'Invalid inquiry status.' })
    }
    filter.status = req.query.status
  }

  const [inquiries, total] = await Promise.all([
    Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Inquiry.countDocuments(filter),
  ])

  return res.json({ inquiries, total, page, pages: Math.ceil(total / limit) })
})

app.patch('/api/inquiries/:id', requireAdmin, requireDatabase, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid inquiry ID.' })
  }

  const parsed = statusInput.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid inquiry status.' })
  }

  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true,
  }).lean()

  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' })
  return res.json({ inquiry })
})

app.post('/api/inquiries/:id/notify', requireAdmin, requireDatabase, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid inquiry ID.' })
  }

  const inquiry = await Inquiry.findById(req.params.id)
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' })

  try {
    await sendInquiryNotification(inquiry)
    inquiry.notificationStatus = 'sent'
    inquiry.notifiedAt = new Date()
    await inquiry.save()
    return res.json({ notificationSent: true })
  } catch (error) {
    inquiry.notificationStatus = 'failed'
    await inquiry.save()
    console.error('Could not resend inquiry notification:', error.message)
    return res.status(502).json({ message: 'The email could not be sent. Check the SMTP configuration and try again.' })
  }
})

const appDirectory = path.dirname(fileURLToPath(import.meta.url))
const clientBuildDirectory = path.resolve(appDirectory, '../dist')

if (existsSync(clientBuildDirectory)) {
  app.use(express.static(clientBuildDirectory))
  app.get('/{*path}', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    return res.sendFile(path.join(clientBuildDirectory, 'index.html'))
  })
}

app.use((error, _req, res, _next) => {
  console.error('Request failed:', error.message)
  return res.status(500).json({ message: 'An unexpected error occurred. Please try again.' })
})

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      console.info('Connected to MongoDB.')
    } catch (error) {
      console.error('Could not connect to MongoDB:', error.message)
    }
  } else {
    console.warn('MONGODB_URI is not set. The website will run, but inquiry submissions are disabled.')
  }

  app.listen(port, () => console.info(`Crystaflex API listening on port ${port}.`))
}

start()