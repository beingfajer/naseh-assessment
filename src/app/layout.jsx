import './globals.css'

export const metadata = {
  title: 'Company assessment and policy generation',
  description: 'Company assessment and policy generation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}