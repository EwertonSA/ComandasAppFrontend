import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import { Container } from "reactstrap"
import styles from "../styles/register.module.scss"
const Pedidos=()=>{
    return<>
    <Head>
    <title>Realizar pedidos</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main>
        <HeaderGeneric logoUrl="/comandas" btnUrl="/pedidosProdutos" btnContent="Pedir" />
    </main>
    <Container className="py-5">

    </Container>
    </>
}
export default Pedidos