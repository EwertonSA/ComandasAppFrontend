'use client'

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import PaymentAction from "./action"
import styles from "../../../styles/register.module.scss"

interface PaymentClientProps {
  params: { comandaId: string }
  valor: string    
  formaPagamento: string
}

const PaymentForm = ({ params, valor, formaPagamento }: PaymentClientProps) => {
  console.log("comandaId:", params.comandaId)

  return (
    <main>
      <Container className="py-5">
        <Form action={PaymentAction} className={styles.form}>
          
          {/* Envia o comandaId escondido */}
          <Input type="hidden" name="comandaId" value={params.comandaId} />

          <FormGroup>
            <Label className={styles.label} for="comandaId">Comanda</Label>
            <Input 
              className={styles.input}
              type="text"
              id="comandaId"
              value={params.comandaId}
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="valor">Valor</Label>
            <Input 
              className={styles.input}
              type="text"
              id="valor"
              name="valor"
              value={valor}
              readOnly
            />
          </FormGroup>

         <FormGroup>
  <Label className={styles.label} for="formaPagamento">Forma de pagamento</Label>
  <Input 
    className={styles.input}
    type="select"
    id="formaPagamento"
    name="formaPagamento"
    defaultValue={formaPagamento}
    required
  >
    <option value="Dinheiro">Dinheiro</option>
    <option value="Cartão">Cartão</option>
    <option value="Pix">Pix</option>
  </Input>
</FormGroup>


          <Button className={styles.formBtn} type="submit">Pagar</Button>
        </Form>
      </Container>
    </main>
  )
}

export default PaymentForm
