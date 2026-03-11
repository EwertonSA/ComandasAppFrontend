import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Verify2FAAction } from "./verify2fa";
import Image from "next/image";
import styles from '../../../styles/getStyles.module.scss'
import { useState } from "react";
import authService from "@/src/services/authService";
const Form2fa=()=>{
      const [userId, setUserId] = useState<string | null>(null);
      const [token, setToken] = useState("");
      const [qrCode, setQrCode] = useState<string | null>(null);
      const [showTokenInput, setShowTokenInput] = useState(false);
console.log(styles);
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


return(
        <Form
            className={styles.form}
            action={async (formData: FormData) => {
              if (!userId) return;
              const tokenValue = formData.get("token")?.toString() || "";
              await Verify2FAAction(Number(userId), tokenValue);
            }}
          >
      
            {qrCode && (
              <div className={styles.auth}>
                <p className={styles.title}>Escaneie o QR Code no seu Authenticator antes de inserir o códigodsfdsfdsagfdsgfdsgfsd:</p>
                <Image src={qrCode} alt="QR Code 2FA" height={600} width={600}/>
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
                  onChange={e => setToken(e.target.value)}
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
)
}
export default Form2fa