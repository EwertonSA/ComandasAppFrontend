'use client'

import { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/register.module.scss";
import { LoginAction } from "./action";
import { Verify2FAAction } from "./verify2fa";
import { LoginAction2fa } from "./action2fa";


const FormLogin2fa = () => {
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
      <Container className="py-5">
        {!twoFARequired ? (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
              const res = await LoginAction2fa(formData);
              if (res?.twoFARequired) {
                setTwoFARequired(true);
                setUserId(res.userId);
              }
            }}
          >
            <FormGroup>
              <Label for="email">EMAIL</Label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">SENHA</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit">Entrar</Button>
          </Form>
        ) : (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
              if (!userId) return;
              const tokenValue = formData.get("token")?.toString() || "";
              await Verify2FAAction(userId, tokenValue);
            }}
          >
            <p>Insira o código do Authenticator</p>
            <FormGroup>
              <Label for="token" className={styles.label}>Código 2FA</Label>
              <Input
                id="token"
                name="token"
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="000000"
                maxLength={6}
                required
              />
            </FormGroup>
            <Button outline className={styles.formBtn} type="submit">Confirmar</Button>
          </Form>
        )}
      </Container>
    </main>
  );
};

export default FormLogin2fa;
