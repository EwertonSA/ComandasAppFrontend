'use client'

import { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/register.module.scss";
import Link from "next/link";
import { FACEBOOK_AUTH_URL } from "./Oauth";
import FacebookButton from "./faceBtn";
import { LoginAction2fa } from "./action2fa";
import { Verify2FAAction } from "./verify2fa";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import authService from "@/src/services/authService";
import OauthButton from "./OauthButton";
import Form2fa from "./form2fa";

const FormLogin = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);


  // 🔹 Resetar o QR Code / 2FA

  return (
    <main className={styles.main}>
      <Container className="py-5">
        <p className={styles.formTitle}>Bem vindo(a) de volta</p>

        {/* ================= LOGIN NORMAL ================= */}
        {!twoFARequired ? (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
              if (!recaptchaToken) {
                alert("Por favor, marque o reCAPTCHA");
                return;
              }

              formData.append("recaptchaToken", recaptchaToken);

              const res = await LoginAction2fa(formData);

              if (res?.twoFARequired) {
                setTwoFARequired(true);
                setUserId(res.userId?.toString() || null);
                setQrCode(res.qrCode || null); 
                setShowTokenInput(true);
              }
            }}
          >
            <p><strong>Bem vindo ao serviço de comandas</strong></p>

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
              />
            </FormGroup>

            {/* Logins sociais */}
           <OauthButton/>

            {/* 🔹 reCAPTCHA v2 */}
            <FormGroup className={styles.recaptcha}>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </FormGroup>

            <Button outline className={styles.formBtn} type="submit">Entrar</Button>
          </Form>
        ) : (
<Form2fa/>
        )}
      </Container>
    </main>
  );
};

export default FormLogin;
