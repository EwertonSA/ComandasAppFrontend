'use client'
import authService from "@/src/services/authService";
import { useEffect, useState } from "react";
import { Verify2FAAction } from "../verify2fa";
import Image from "next/image";

interface Params {
  params: { userId: string };
}

export default function Google2FA({ params }: Params) {
  const userId = params.userId;

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    async function fetchQR() {
      if (!userId) return;
      const res = await authService.setup2faService(userId);
      setQrCode(res.qrCodeDataURL);
      setShowTokenInput(true);
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
      {qrCode && (
        <div>
          <p>Escaneie o QR Code no Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={200} height={200}/>
        </div>
      )}
      {showTokenInput && (
        <div>
          <label>Código 2FA</label>
          <input
            value={token}
            onChange={e => setToken(e.target.value)}
            maxLength={6}
            required
          />
        </div>
      )}
      <button type="submit">Confirmar</button>
    </form>
  );
}
