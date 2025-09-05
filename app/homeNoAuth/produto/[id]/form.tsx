'use client'
import { OrderProductProps } from "@/app/employeeApp/products/[id]/form"

import styles from '../../../../styles/getStyles.module.scss'
import { Button, Container, Form, Input } from "reactstrap"
import Image from "next/image"
import OrderClientAction from "./action"

const ClientOrderForm=({produto,comandaId,produtoId}:OrderProductProps)=>{
    const imgUrl=produto.thumbnailUrl
    ? `http://localhost:3001/${produto.thumbnailUrl}`:null
   
return(
<main className={styles.main} style={{
      backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundPosition: 'center',
      height: '100%',
      minWidth: '100%'
    }} key={produto.id}>
    <Container className={styles.container}>
       {imgUrl&&(
         <Image src={imgUrl} alt="ProductImg" width={50} height={50}/>
      
       )}
        <p className={styles.subTitle}>{produto.nome}</p>
        <p className={styles.subTitle}>{produto.descricao}</p>
        <p className={styles.subTitle}>{produto.preco}</p>
        <p className={styles.subTitle}>{produto.categoria}</p>
        <Form action={OrderClientAction}>
            <Input hidden name="comandaId" value={comandaId} readOnly/>
            <Input hidden  name="produtoId" value={produtoId} readOnly/>
            <Input type="number" id="quantidade" name="quantidade" min={1} defaultValue={1} className={styles.input}/>
            <Button type="submit" color="primary" className="mt-3">Pedir</Button>
        </Form>

    </Container>

</main>
)
}
export default ClientOrderForm