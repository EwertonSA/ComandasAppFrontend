'use client'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import Pay from "./action"

import styles from '../../../../styles/register.module.scss'

import { useState } from "react"
interface PaymentFormProps {
  comandaId: string
  totalDelivered: string
}
const PaymentForm=({comandaId,totalDelivered}:PaymentFormProps)=>{
  
      
        const [valor, setValor] = useState<number>(0)
  const [formaPagamento, setFormaPagamento] = useState("")
    if (!comandaId) return;
    return(
<main>
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo ao pagamento</p>
          <Form className={styles.form} action={Pay}>
            <p>Faça o pagamento</p>
            <FormGroup>
              <Label for="comandaId" className={styles.label}>PedidoId</Label>
              <Input
                id="comandaId"
                name="comandaId"
                type="number"
                placeholder="comandaId"
                required
                className={styles.input}
                value={comandaId}
                disabled
              />
              <input type="hidden" name="comandaId" value={comandaId} />
            </FormGroup>
            <FormGroup>
              <Label for="valor" className={styles.label}>Valor</Label>
              <Input
                id="valor"
                type="number"
                placeholder="Valor"
                required
                className={styles.input}
                value={totalDelivered}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="formaPagamento" className={styles.label}>Forma de Pagamento</Label>
              <Input
                id="formaPagamento"
                name="formaPagamento"
                type="text"
                placeholder="formaPagamento"
                required
                className={styles.input}
                value={formaPagamento}
                onChange={(ev) => setFormaPagamento(ev.target.value)}
              />
            </FormGroup>
            <Button className={styles.formBtn} type="submit">Enviar</Button>
          </Form>
        </Container>
      </main>)
}
export default PaymentForm