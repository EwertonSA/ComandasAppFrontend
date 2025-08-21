import Image from "next/image";
import authService from "@/src/services/authService";
import { Verify2FAAction } from "../verify2fa";

// Página server-side (async)
export default async function Google2FA({ params }: any) {
  const { userId } = params; // pega direto do Next.js

  // Pegar QR Code do backend
  const res = await authService.setup2faService(userId);
  const qrCode = res.qrCodeDataURL;

  return (
    <div>
      <h1>2FA para usuário {userId}</h1>
      {qrCode && (
        <div>
          <p>Escaneie o QR Code no Authenticator:</p>
          <Image src={qrCode} alt="QR Code 2FA" width={200} height={200} />
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const token = (e.target as any).token.value;
          await Verify2FAAction(Number(userId), token);
        }}
      >
        <label>Código 2FA</label>
        <input name="token" maxLength={6} required />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
}
