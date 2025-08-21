// app/login/user/2fa-oauth/[userId]/page.tsx
import Image from "next/image";
import { Verify2FAAction } from "../verify2fa";
import authService from "@/src/services/authService";

interface PageProps {
  params: { userId: string };
}

export default async function Google2FA({ params }: PageProps) {
  const userId = params.userId;

  // 🔹 Chama serviço no servidor direto
  const res = await authService.setup2faService(userId);
  const qrCode = res.qrCodeDataURL;

  return (
    <form method="post">
      {qrCode && (
        <div>
          <p>Escaneie o QR Code no Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={200} height={200} />
        </div>
      )}
      <div>
        <label>Código 2FA</label>
        <input name="token" maxLength={6} required />
      </div>
      <button type="submit">Confirmar</button>
    </form>
  );
}
