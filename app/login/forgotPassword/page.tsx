'use client'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/register.module.scss";
import { useState } from "react";
import forgotPassword from "./action";


const ForgotPassword=()=>{
      const [email, setEmail] = useState("");
   
return(
      <Form
            className={styles.form}
        action={forgotPassword}
          >
            <p><strong>Bem vindo ao resetar senha</strong></p>

            <FormGroup>
              <Label for="email" className={styles.label}>EMAIL</Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Digite seu email"
                className={styles.input}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>

       
 


            <Button outline className={styles.formBtn} type="submit">Entrar</Button>
          </Form>
)
}
export default ForgotPassword