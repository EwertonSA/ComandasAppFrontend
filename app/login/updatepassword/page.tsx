'use client'
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import styles from "../../../styles/register.module.scss";
import { resetAction } from "./action";

export default function reset(){
       const [password, setPassword] = useState("");
       const [confirmPassword, setConfirmPassword] = useState("");
return(
    <Form action={resetAction}>
         <FormGroup>
              <Label for="password" className={styles.label}>SENHA</Label>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                maxLength={20}
                className={styles.input}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="password" className={styles.label}> CONFIRMAR SENHA</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirme a senha"
                maxLength={20}
                className={styles.input}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
            </FormGroup>
                   <Button outline className={styles.formBtn} type="submit">Entrar</Button>
            </Form>
)
}