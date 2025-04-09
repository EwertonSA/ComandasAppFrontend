import clienteService from "@/src/services/clienteService"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from "../../../../styles/register.module.scss"

const Pagamentos=()=>{
    const router=useRouter()
    const [color,setColor]=useState('')
    const[toastIsOpen,setToastIsOpen]=useState(false)
    const[errorMessage,setErrorMesasage]=useState("")
    

const [pedidoId,setPedidoId]=useState('')
const [valor,setValor]=useState('')
const[formaPagamento,setFormaPagamento]=useState('')

useEffect(()=>{
    const comandaId=router.query.id
    console.log("ID recebido via query:", comandaId)
    if(!comandaId) return 

    const fetchPagamento=async()=>{
        const comanda=await clienteService.getPedidosComanda(comandaId as string)
        console.log("Resposta da comanda:", comanda);
        if (comanda && comanda.pedidos && comanda.pedidos.length > 0) {
            // Exemplo com primeiro pedido:
            const pedido = comanda.pedidos[0];
            console.log("Pedido selecionado:", pedido);
      
            setPedidoId(pedido.id.toString());
            setValor(pedido.total.toString());
            setFormaPagamento(pedido.formaPagamento || ''); // Se não existir, usa string vazia
        
          } else {
            setValor('0');
          }
        
    }
fetchPagamento()
},[router.query.id])

const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  
    const res = await clienteService.pagamento({
      pedidoId,
      valor, 
      formaPagamento,
      status: "Pago"
    });
  
    if (res === 200) {
      router.push('/clienteInfo');
      setToastIsOpen(true);
      setErrorMesasage("Pagamento realizado");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 3000);
    } else {
      setToastIsOpen(false);
      setErrorMesasage("Pagamento não realizado");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
        router.push('/clienteInfo')
      }, 1000);
    }
  };
  
return<>
<Head>
<title>Registro</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main>
    <Container className="py-5">
        <p>Bem-vindo ao pagamento</p>
        <Form className={styles.form} onSubmit={handleSubmit}>
            <p>Faça o pagamento</p>
            <FormGroup>
            <Label for="pedidoId" className={styles.label}>PedidoId</Label>
            <Input id="pedidoId" name="pedidoId" type="number" placeholder="pedidoId" required className={styles.input} value={pedidoId} onChange={(ev)=>setPedidoId(ev.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for='valor' className={styles.label}>Valor</Label>
                <Input id="valor" name="valor" type="number" placeholder="Valor" required className={styles.input} value={valor} onChange={(ev)=>setValor(ev.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for='formaPagamento' className={styles.label}>formaPagamento</Label>
                <Input id="formaPagamento" name="formaPagamento" type="text" placeholder="formaPagamento" required className={styles.input} value={formaPagamento} onChange={(ev)=>setFormaPagamento(ev.target.value)}/>
            </FormGroup>  
            <Button className={styles.formBtn} type="submit">Enviar</Button>
        </Form>
    </Container>
</main>

</>
}
export default Pagamentos