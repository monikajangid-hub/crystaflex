import './globals.css'
import { metadata } from './metadata'

// oxlint-disable-next-line react/only-export-components -- Next.js requires metadata exports in layouts.
export { metadata }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}