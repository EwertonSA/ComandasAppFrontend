'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Verify2FAAction } from "../verify2fa";
import authService from "@/src/services/authService";


export default function Google2FA({ params }: any) {
  const { userId } = params;

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchQR() {
      if (!userId) return;
      const res = await authService.setup2faService(userId);
      setQrCode(res.qrCodeDataURL); // usa o qrCode retornado do serviço
    }
    fetchQR();
  }, [userId]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    await Verify2FAAction(Number(userId), token);
  }

  return (
    <form onSubmit={handleVerify}>
      <h1>2FA para usuário {userId}</h1>

      {qrCode && (
        <div>
          <p>Escaneie o QR Code no Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={200} height={200}/>
        </div>
      )}

      <div>
        <label>Código 2FA</label>
        <input
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength={6}
          required
        />
      </div>

      <button type="submit">Confirmar</button>
    </form>
  );
}
