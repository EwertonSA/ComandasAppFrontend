'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import authService from "@/src/services/authService";
import { Verify2FAAction } from "../verify2fa";
import styles from "../../../../styles/getStyles.module.scss"
import { Button, Form, Input } from "reactstrap";


export default function Google2FA({ params }: any) {
  const { userId } = params;

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar QR Code do backend
  useEffect(() => {
    async function fetchQRCode() {
      try {
        const res = await authService.setup2faService(userId);
        if (res.qrCodeDataURL) {
          setQrCode(res.qrCodeDataURL);
        } else {
          setError("Falha ao carregar QR Code");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar QR Code");
      } finally {
        setLoading(false);
      }
    }

    fetchQRCode();
  }, [userId]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    try {
      await Verify2FAAction(Number(userId), token);
      // redirecionamento ocorre dentro do Verify2FAAction
    } catch (err: any) {
      setError(err.message || "Código inválido");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main >
      <div className={styles.qrContainer}>
      <h1>Autenticação 2FA</h1>
      {qrCode && (
        <div className={styles.center}>
          <p className={styles.subtitle}>Escaneie este QR Code no seu Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={300} height={300} />
        </div>
      )}
      <Form onSubmit={handleVerify} >
        <div className={styles.center}>
        <label>Código 2FA</label>
        <Input
          type="text"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength={6}
          required
        />
        <Button type="submit">Confirmar</Button>
        </div>
      </Form>
      </div>
    </main>
  );
}
