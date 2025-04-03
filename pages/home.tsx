import HeaderAuth from "@/src/components/common/headerAuth"
import Product from "@/src/components/homeAuth/products"
import Head from "next/head"


const HomeAuth=()=>{
    return(
        <>
        <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
            <HeaderAuth/>
          <Product/>
        </main>
        </>
    )
}
export default HomeAuth