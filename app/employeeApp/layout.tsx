import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "EmployeeApp - Restaurante",
    template: "%s | EmployeeApp",
  },
  description:
    "Aplicativo interno para colaboradores de restaurantes realizarem pedidos de clientes com rapidez e eficiência.",
  keywords: [
    "restaurante",
    "pedidos",
    "app de pedidos",
    "colaboradores",
    "garçom digital",
    "atendimento",
  ],
  openGraph: {
    title: "EmployeeApp - Restaurante",
    description:
      "Facilite o atendimento do seu restaurante: app para colaboradores registrarem pedidos de clientes.",
    url: "https://esadev.com.br/indexComandas",
    siteName: "EmployeeApp",
    images: [
      {
        url: "https://esadev.com.br/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EmployeeApp - Restaurante",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmployeeApp - Restaurante",
    description:
      "App para colaboradores de restaurantes registrarem pedidos de clientes.",
    images: ["https://esadev.com.br/og-image.jpg"],
  },
  metadataBase: new URL("https://esadev.com.br"),
};

const RootLayoutEmployeeApp = ({children}:{children:ReactNode}) => {
    return (
        <div>
            <HeaderAuth logoUrl="/employeeApp"/>
            <main className="d-flex flex-column align-items-center justify-content-center">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default RootLayoutEmployeeApp
