
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/register.module.scss";
import { pagamentoService } from "@/src/services/pagamentoService";
import { comandaService } from "@/src/services/comandaService";
type PagamentosProps = {
   redirectTo?: () => void | Promise<void>;
};
const Pagamentos = ({redirectTo}:PagamentosProps) => {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMesasage] = useState("");

  const [comandaId, setComandaId] = useState("");
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const searchParams=useSearchParams()

  useEffect(() => {
    const comandaId = searchParams.get('comandaId');
    if (!comandaId) return;
  const token = typeof window !== "undefined"
    ? sessionStorage.getItem("comandas-token")
    : null;
    const fetchPagamento = async (token:string |null) => {
      const comanda = await comandaService.getPedidosComanda(token,comandaId as string);
      if (comanda && comanda.pedidos && comanda.pedidos.length > 0) {
        const totalCoamnda = comanda.pedidos.reduce((acc: number, pedido: any) => {
          const isEntregue=pedido.status?.toLowerCase()==="entregue"
          const valorPedido =isEntregue? Number(pedido.total || 0):0;
          return acc + valorPedido;
        }, 0);

        setComandaId(comanda.id.toString());
        setValor(totalCoamnda.toFixed(2));
        setFormaPagamento(comanda.pedidos[0].formaPagamento || '');
      } else {
        setValor("0");
      }
    };

    fetchPagamento(token);
  }, [searchParams]);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  const token = typeof window !== "undefined"
    ? sessionStorage.getItem("comandas-token")
    : null;
    const res = await pagamentoService.pagamento(token,{
      comandaId,
      valor,
      formaPagamento,
      status: "Pago"
    });

    if (res === 200 ||  res ===201) {
if(redirectTo) redirectTo()

      setToastIsOpen(true);
      setErrorMesasage("Pagamento realizado");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 3000);
    } else {
      setToastIsOpen(false);
      setErrorMesasage("Pagamento não realizado");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      if (redirectTo) {
  redirectTo(); // chama a função
}
      }, 1000);
    }
  };

  return (
    <>
 
      <main>
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo ao pagamento</p>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <p>Faça o pagamento</p>
            <FormGroup>
              <Label for="comandaId" className={styles.label}>PedidoId</Label>
              <Input
                id="comandaId"
                name="comandaId"
                type="number"
                placeholder="comandaId"
                required
                className={styles.input}
                value={comandaId}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="valor" className={styles.label}>Valor</Label>
              <Input
                id="valor"
                name="valor"
                type="number"
                placeholder="Valor"
                required
                className={styles.input}
                value={valor}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="formaPagamento" className={styles.label}>Forma de Pagamento</Label>
              <Input
                id="formaPagamento"
                name="formaPagamento"
                type="text"
                placeholder="formaPagamento"
                required
                className={styles.input}
                value={formaPagamento}
                onChange={(ev) => setFormaPagamento(ev.target.value)}
              />
            </FormGroup>
            <Button className={styles.formBtn} type="submit">Enviar</Button>
          </Form>
        </Container>
      </main>
    </>
  );
};

export default Pagamentos;
