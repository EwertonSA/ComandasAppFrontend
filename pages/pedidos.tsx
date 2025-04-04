import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from "../styles/register.module.scss"
import { FormEvent, useEffect, useState } from "react"
import pedidoService from "@/src/services/pedidoService"
import { useRouter } from "next/router"
const Pedidos=()=>{
    const router=useRouter()
    const [toastOpen,setToastOpen]=useState(false)
    const [toastMessage,setToastMessage]=useState('')
    const [toastColor,setToastColor]=useState('')
    const comandaSuccess=router.query.registred
    useEffect(()=>{
if(comandaSuccess==='true'){
    setToastColor('bg-success')
    setToastOpen(true);
    setTimeout(()=>{
        setToastOpen(false)
    },1000*3)
    setToastMessage("Pedido bem sucedido")
}
    },[router.query])

    const handleOrders=async(ev:FormEvent<HTMLFormElement>)=>{
        const formData= new FormData(ev.currentTarget)
        const comandaId= formData.get('comandaId')!.toString()
        const total= formData.get('total')!.toString()
        const stat= formData.get('status')!.toString()
        const params={comandaId,total,status:stat}
        const res= await pedidoService.getOrder(params)
        if(res?.status===201){
            router.push('/pedidosProdutos?registred:true')
        }else{
            alert("erro")
        }
        
    }
    return<>
    <Head>
    <title>Realizar pedidos</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main>
        <HeaderGeneric logoUrl="/comandas" btnUrl="/pedidosProdutos" btnContent="Pedir" />
        <Container className="py-5">
        <p className={styles.FormTitle}>Fazer pedidos</p>
        <Form  className={styles.form} onSubmit={handleOrders}>
            <p className="text-center"><strong>Pedido</strong></p>
            <FormGroup>
                <Label for='comandaId' className={styles.label}>Comanda Id</Label>
                <Input
                id="comandaId"
                placeholder="Número da comanda"
                name="comandaId"
                type="number"
                maxLength={20}
                required className={styles.input}/>
                
            </FormGroup>
            <FormGroup>
                <Label className={styles.label} for='total'>Total</Label>
                <Input id="total" name="total" type="number" placeholder="Valor total" required className={styles.input}/>
            </FormGroup>
            <FormGroup>
                <Label className={styles.label} for="status">
                    Status
                </Label>
                <Input id="status" name="status" type="text" placeholder="andamento/entregue" required className={styles.input}/>
            </FormGroup>
            <Button outline className={styles.formBtn} type="submit">Cadastrar</Button>
        </Form>
    </Container>
    </main>
   
    </>
}
export default Pedidos