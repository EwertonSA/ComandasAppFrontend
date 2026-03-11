import AosInitializer from '@/src/components/common/hooks/produtos/aosInit';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from "react"
import { Metadata } from 'next';


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

export default function Layout({children}:{children:ReactNode}){

  
return(
 <html lang="pt-BR">
  <body>
    {children}
    <AosInitializer />
    <div id="modal-root"></div> {/* usado pelo ReactDOM.createPortal */}
  </body>
</html>
)
}