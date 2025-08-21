'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Verify2FAAction } from "./verify2fa";

import Image from "next/image";
import authService from "@/src/services/authService";

export default function Google2FA() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const mode = params.get("mode"); // "setup" ou "verify"

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function fetchQR() {
      if (mode === "setup") {
        const res = await authService.setup2faService(userId!);
        setQrCode(res.qrCodeDataURL);
      }
      setShowTokenInput(true);
    }

    fetchQR();
  }, [userId, mode]);

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
