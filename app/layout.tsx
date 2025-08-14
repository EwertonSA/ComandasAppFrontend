import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from "react"
import AosInitializer from '@/src/component/hooks/produtos/aosInit';

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