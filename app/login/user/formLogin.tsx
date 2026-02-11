'use client'

import { FormEvent, useState } from "react";
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
import OauthButton from "./faceBtn";
import { LoginAction } from "./action";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


const FormLogin = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [role,setRole]=useState<string>('')
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [error, setError] = useState("");
  const router = useRouter();


  // 🔹 Resetar o QR Code / 2FA
  const handleResetQrCode = async () => {
    if (!userId) {
      console.error("userId não definido!");
      return;
    }
    try {
      const res = await authService.reset2fa({ userId: userId.toString() });
      setQrCode(res?.data.qrCodeDataURL); // atualiza QR
      setShowTokenInput(true);            // mostra o campo do token também
    } catch (error) {
      console.error("Erro ao gerar novo QR:", error);
    }
  };


  const handle2faSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const res = await authService.verify2fa({ userId:Number(userId), token });

      if (!res || res.status !== 200) {
        throw new Error("Código 2FA inválido");
      }

      const userRole = res.data.user.role;

      // ✅ Redireciona no client
      if (userRole === "admin") return router.push(`${process.env.NEXT_PUBLIC_BASEURL}/admin`);
      if (userRole === "user") return router.push("/employeeApp");
      if (userRole === "cliente") return router.push("/clientApp");

      // fallback
      router.push("/login/index");
    } catch (err: any) {
      console.error("Erro ao verificar 2FA:", err);
      setError(err.message || "Erro inesperado");
    }
  };
  return (
    <main className={styles.main}>
      <Container className="py-5">
        <p className={styles.formTitle}>Bem vindo(a) de volta</p>

        {/* ================= LOGIN NORMAL ================= */}
        {!twoFARequired ? (
          <Form
            className={styles.form}
            action={async (formData: FormData) => {
           //   if (!recaptchaToken) {
           //     alert("Por favor, marque o reCAPTCHA");
           //     return;
           //   }

           //   formData.append("recaptchaToken", recaptchaToken)

              const res = await LoginAction(formData);

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
                autoComplete="current-password"
              />
            </FormGroup>
            <FormGroup>
  <Label for="role" className={styles.label}>TIPO DE USUÁRIO</Label>
  <Input
    type="select"
    id="role"
    name="role"
    className={styles.input}
    value={role}
    onChange={e => setRole(e.target.value)}
    required
  >
    <option value="">Selecione</option>
    <option value="admin">Admin</option>
    <option value="user">Colaborador</option>
    <option value="cliente">Cliente</option>
  </Input>
</FormGroup>
<Link href={"/login/forgotPassword"}><div className={styles.label}>
  Esqueceu sua senha?
  </div></Link>
            {/* Logins sociais */}
 <OauthButton/>

            {/* 🔹 reCAPTCHA v2 */}
            {/* <FormGroup className={styles.recaptcha}> */}
            {/*  <ReCAPTCHA */}
             {/*   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} */}
             {/*   onChange={(token) => setRecaptchaToken(token)} */}
            {/*  /> */}
          {/*  </FormGroup> */}

            <Button outline className={styles.formBtn} type="submit">Entrar</Button>
          </Form>
        ) : (

        /* ================= LOGIN COM 2FA ================= */
          <Form onSubmit={handle2faSubmit}
            className={styles.form}
           
          >
            {/* Só mostra QR se o backend mandar OU se resetar */}
            {qrCode && (
              <div className={styles.qrContainer}>
                <p>Escaneie o QR Code no seu Authenticator antes de inserir o código:</p>
                <Image src={qrCode} alt="QR Code 2FA" height={400} width={400}/>
              </div>
            )}

            {/* Sempre mostra o input do token se 2FA ativo */}
            {showTokenInput && (
              <FormGroup>
                <Label for="token" className={styles.label}>Código 2FA</Label>
                <Input
                  id="token"
                  name="token"
                   value={token}
        onChange={(e) => setToken(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </FormGroup>
            )}

            {/* 🔹 Botão opcional de reset */}
            <div className="d-flex gap-2">
              <Button outline onClick={handleResetQrCode}>Gerar novo QR</Button>
              <Button outline className={styles.formBtn} type="submit">Confirmar</Button>
            </div>
          </Form>
        )}
      </Container>
    </main>
  );
};

export default FormLogin;
