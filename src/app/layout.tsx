import Link from "next/link";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Framework Next',
  description: '...',
}

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <header>            
            <Link href={"/"}>  Interfaz  </Link>-
            <Link href={"/about"}>  Acerca  </Link>
            <h2>
              aplicacion de Consultas
            </h2>
          </header>
          <main>{children}</main>
        </body>
      </html>
    )
  }