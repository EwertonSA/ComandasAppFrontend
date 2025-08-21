// app/login/user/[userId]/page.tsx
'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import authService from "@/src/services/authService";
import { Verify2FAAction } from "../verify2fa";



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
    <div>
      <h1>Autenticação 2FA</h1>
      {qrCode && (
        <div>
          <p>Escaneie este QR Code no seu Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={200} height={200} />
        </div>
      )}
      <form onSubmit={handleVerify}>
        <label>Código 2FA</label>
        <input
          type="text"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength={6}
          required
        />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
}
