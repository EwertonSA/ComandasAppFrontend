import Link from "next/link"

const FooterIndex=()=>{
return(
    <main className="d-flex flex-row justify-content-center">
    <Link href={'https://github.com/EwertonSA'}>
    
    <p>Github</p>
    </Link>
      <Link href={'www.linkedin.com/in/ewerton-silva-de-abreu-5bab0717b'}>
    
    <p>LinkedIn</p>
    </Link>
    </main>
)
}
export default FooterIndex