import { props } from "@/src/components/common/slideCard"
import produtService, { ProductType, ProdutoProps } from "@/src/services/productService"
import styles from "../../../../styles/getStyles.module.scss"
import useSWR from "swr"
import { useRouter } from "next/router"
import { Button, Container, Form, Input } from "reactstrap"
import React, { useState } from "react"
import { usePedidosForm } from "../../hooks/pedidos/usePedidoForm"

const ProductId=()=>{
    const router=useRouter()
    const {id}=router.query
    const [quantity,setquantity]=useState(1)
    const {data,error}=useSWR(id?id:null,produtService.getProductById)
     const {
        entrada,
        setEntrada,
        suggestions,
        toastOpen,
        toastColor,
        toastMessage,
        handleOrders,
        handleEntradaChange,
        handleSuggestionClick
      } = usePedidosForm(()=>router.push("/pagina"))
    
  if (error) return <p>Erro ao carregar produto</p>
    if(!data){
        return <p>Loading</p>
    }

    const cleanPath = data.thumbnailUrl.replace(/^thumbnailUrl\//, '')
    const imgUrl = `${process.env.NEXT_PUBLIC_BASEURL}/thumbnailUrl/${cleanPath}`
    const handleIncrease=()=>setquantity((prev)=>prev+1)
    const handleDecrease=()=>setquantity((prev)=>prev>1?prev-1:1)

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
const value=parseInt(e.target.value)
setquantity(isNaN(value)|| value < 1 ? 1 : value)
    }

return(
    <main className={styles.main} style={{
        backgroundImage:`linear-gradient(to bottom, #6666661a, #151515),url(${imgUrl})`,
        backgroundSize:"cover",
        backgroundPosition:'center',
        height:'100vh',
        minWidth:'100vh'

    }} key={data.id}>
<Container className={styles.container}>
<img src={imgUrl} alt="" className={styles.slide} />
    <p className={styles.subTitle}>{data.nome}</p>
    <p className={styles.subTitle}>{data.descricao}</p>
    <p className={styles.subTitle}>{data.preco}</p>
    <p className={styles.subTitle}>{data.categoria}</p>
    <Form onSubmit={(e) => {
  e.preventDefault();
  const entradaFormatada = `${data.nome}*${quantity}`;
  setEntrada(entradaFormatada);
  handleOrders(e);
}}>
    <Input id="quantidade" type="number" name="quantidade" className={styles.input} value={quantity} onChange={handleChange} />
  <div className="d-flex flex-row m-3 gap-2 align-items-center justify-content-center"> <Button onClick={handleIncrease} color="success">+</Button>
  <Button onClick={handleDecrease} color="danger">-</Button></div> 
  <Button type="submit">Pedir</Button>
  </Form>
</Container>
    </main>
)
}
export default ProductId