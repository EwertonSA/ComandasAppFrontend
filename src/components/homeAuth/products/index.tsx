import produtService, { ProductType } from "@/src/services/productService";

import useSWR from "swr";
import styles from "../../../../styles/getStyles.module.scss"
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
<Container className="d-flex flex-wrap justify-content-center">
<h1>Produtos</h1>
{data.data?.map((product:ProductType)=>(
    <div>
       
 <div key={product.id} className={styles.container}>
      
     
            <p className={styles.title}>{product.nome}</p>
            <p className={styles.description}>{product.descricao}</p>
            <Link href={`/produtos/${product.id}`}>
            <Button outline color="success">Ver produto
              
            </Button>
            </Link>
       
    </div>
    </div>
   
    
))}
</Container>
</>
}
export default Product