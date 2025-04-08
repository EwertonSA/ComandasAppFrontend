import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"

const PedidosProdutos=()=>{

    return <>
    <Head>
    <title>Realizar pedidos</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main>
        <HeaderGeneric logoUrl="/pedidos" btnUrl="/pedidosProdutos" btnContent="Pedir"/>
    </main>
    </>
}
export default PedidosProdutos