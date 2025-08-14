'use client'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from '../../../styles/register.module.scss'
import LoginAction from "./action"

const ClientForm=({mesas}:{mesas:any[]})=>{
return(
      <main className={styles.main}>
           
            <Container className="py-5">
                <p className={styles.formTitle}> Bem vindo(a) de volta</p>
                <Form className={styles.form} action={LoginAction}>
                    <p><strong>Bem vindo ao serviço de comandas</strong></p>
                    <FormGroup>
                        <Label for="mesaId" className={styles.label}>MESA ID</Label>
                       <Input
            type="select"
            id="mesaId"
            name="mesaId"
            required
            className={styles.input}
          >
            <option value="">Selecione uma mesa</option>
            {Array.isArray(mesas)&&mesas.map((mesa:any) => (
              <option key={mesa.id} value={mesa.id}>
                Mesa {mesa.numero} (Capacidade: {mesa.capacidade})
              </option>
            ))}
          </Input></FormGroup>
                    <FormGroup>
                        <Label for="nome" className={styles.label}>NOME</Label>
                        <Input name="nome" type="text" id="nome" placeholder="Digite seu nome" className={styles.input} required/>
                    </FormGroup>
                  
                    <FormGroup>
                        <Label for="email" className={styles.label}>EMAIL</Label>
                        <Input name="email" type="email" id="email" placeholder="Digite seu email" className={styles.input} required/>
                    </FormGroup>
                  
                    <Button outline className={styles.formBtn} type="submit">Entrar</Button>
                </Form>
            </Container>
        </main>
)
}
export default ClientForm