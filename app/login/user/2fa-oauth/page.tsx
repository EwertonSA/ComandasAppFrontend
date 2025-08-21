'use client'

import { useEffect, useState } from "react";
import { Verify2FAAction } from "../verify2fa";
import Image from "next/image";
import authService from "@/src/services/authService";

export default function Google2FA() {
  const [userId, setUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Pega os parâmetros direto da URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setUserId(query.get("userId"));
    setMode(query.get("mode"));
  }, []);

  // Busca o QR Code se for modo "setup"
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


