import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    service: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
    notificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    notifiedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

inquirySchema.index({ createdAt: -1 })
inquirySchema.index({ email: 1 })

export default mongoose.model('Inquiry', inquirySchema)