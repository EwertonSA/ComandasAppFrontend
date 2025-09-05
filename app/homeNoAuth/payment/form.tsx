'use client'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import PaymentAction from "./action"
import styles from "../../../styles/register.module.scss"
interface PaymentClientProps{
    params:{comandaId:string}
    valor:string    
    formaPagamento:string
}
const PaymentForm=({params,valor,formaPagamento}:PaymentClientProps)=>{
    console.log('comandaId:',params.comandaId)
return(
    <main>
    <Container className="py-5">

        <Form action={PaymentAction} className={styles.form}>
            <p></p>
            <FormGroup>
<Label   className={styles.label} for='comandaId'>ComandaId:</Label>
<Input name="comandaId" type="hidden" value={params.comandaId}/>
<Input   className={styles.input} type='number' name="comandaId" id="comandaId" placeholder="comandaId"  value={params.comandaId} required readOnly></Input>
            </FormGroup>
            <FormGroup>
                <Label   className={styles.label} for='valor'>Valor:</Label>
                <Input   className={styles.input} type="number" name="valor" id="valor" placeholder="Valor total" value={valor} readOnly required></Input>
            </FormGroup>
        <FormGroup>
            <Label   className={styles.label} for='formaPagamento'>Forma de pagamento:</Label>
            <Input   className={styles.input} type="text" id="formaPagamento" name="formaPagamento" placeholder="Forma de pagamento" value={formaPagamento}></Input>
        </FormGroup>
        <Button   className={styles.formBtn} type="submit">Pagar</Button>
        </Form>
    </Container>
    </main>
)
}
export default PaymentForm