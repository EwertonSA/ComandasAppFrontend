import produtService, { ProductType } from "@/src/services/productService";
import styles from "./styles.module.scss";
import useSWR from "swr";

import HeaderAuth from "../../common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";



const Product=()=>{
    const {data,error}=useSWR("/produtos",produtService.getproducts);
    if(error) return error;
    if(!data) return(
        <>
        <p>Loading....</p>
        </>
    )
return<>
{data.data?.map((product:ProductType)=>(
    <div>
       
 <div key={product.id}>
      
        <Container>
            <p className={styles.title}>{product.nome}</p>
            <p className={styles.description}>{product.descricao}</p>
            <Link href={`/produtos/${product.id}`}>
            <Button outline color="success">Ver produto
                <img src="/buttonPlay.svg" alt="" className={styles.buttonImg} />
            </Button>
            </Link>
        </Container>
    </div>
    </div>
   
    
))}
</>
}
export default Product