// app/login/user/[userId]/page.tsx
import Image from "next/image";
import authService from "@/src/services/authService";
import { Verify2FAAction } from "../verify2fa";


interface Props {
  params: { userId: string };
}

// Componente Server-side
export default async function Google2FA({ params }: Props) {
  const { userId } = params;

  // Pegar QR Code direto do backend
  const res = await authService.setup2faService(userId);
  const qrCode = res.qrCodeDataURL;

  // Aqui você pode decidir se quer renderizar o input de token diretamente ou passar para Client Component
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
