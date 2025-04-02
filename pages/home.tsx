import HeaderAuth from "@/src/components/common/headerAuth"
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
        </main>
        </>
    )
}
export default HomeAuth