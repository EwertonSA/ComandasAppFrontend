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

const FormLogin = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const handleLoginLinkedIn = () => {
    window.location.href = "https://esadev.com.br/api/auth/linkedin/callback/";
  };

  const handleLoginGoogle = () => {
    window.location.href = "https://esadev.com.br/api/auth/google";
  };

  return (
    <main className={styles.main}>
      <Container className="py-5">
        <p className={styles.formTitle}>Bem vindo(a) de volta</p>

        {!twoFARequired ? (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
               const recaptchaToken = (window as any).grecaptcha.getResponse();

    if (!recaptchaToken) {
      alert("Por favor, marque o reCAPTCHA");
      return;
    }

    // 2️⃣ adicionar token ao FormData
    formData.append("recaptchaToken", recaptchaToken);
              const res = await LoginAction2fa(formData);
              if (res?.twoFARequired) {
                setTwoFARequired(true);
                setUserId(res.userId);
                setQrCode(res.qrCode);
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
                 value={email}             // <- controlado
    onChange={e => setEmail(e.target.value)}  // <- atualiza estado
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" className={styles.label}>SENHA</Label>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha?"
                maxLength={20}
                className={styles.input}
                required
                value={password}
  onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Link href={FACEBOOK_AUTH_URL}><FacebookButton /></Link>
              <Button onClick={handleLoginLinkedIn}>Login com LinkedIn</Button>
              <Button onClick={handleLoginGoogle}>Login com Google</Button>
            </FormGroup>

            <Button outline className={styles.formBtn} type="submit">Entrar</Button>
          </Form>
        ) : (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
              if (!userId) return;
              const tokenValue = formData.get("token")?.toString() || "";
              await Verify2FAAction(userId,tokenValue);
            }}
          >
            {qrCode && (
              <div className={styles.qrContainer}>
                <p>Escaneie o QR Code no seu Authenticator antes de inserir o código:</p>
                <Image src={qrCode} alt="QR Code 2FA" height={400} width={400}/>
              </div>
            )}

            {showTokenInput && (
              <FormGroup>
                <Label for="token" className={styles.label}>Código 2FA</Label>
                <Input
                  id="token"
                  name="token"
                  value={token || ""}
                  onChange={e => setToken(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </FormGroup>
            )}
           <div
  className="g-recaptcha"
  data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
/>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>


            <Button outline className={styles.formBtn} type="submit">Confirmar</Button>
          </Form>
        )}
      </Container>
    </main>
  );
};

export default FormLogin;
