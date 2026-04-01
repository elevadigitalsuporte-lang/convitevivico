import './globals.css'

export const metadata = {
  title: 'Convite Especial',
  description: 'Confirme sua presença no nosso evento.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
