import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata = {
  title: 'Convite Especial',
  description: 'Confirme sua presença no nosso evento.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
