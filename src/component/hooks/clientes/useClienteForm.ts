

import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { mesaService } from "@/src/services/mesaService";
import { comandaService } from "@/src/services/comandaService";

const UseClienteForm = () => {
  const router = useRouter();
  const [mesas, setMesas] = useState<any[]>([]);
  const [mesaSelecionada, setMesaSelecionada] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastColor, setToastColor] = useState("bg-success");

  useEffect(() => {
    const fetchMesas = async () => {
      const res = await mesaService.getMesas();
      if (Array.isArray(res)) {
        setMesas(res);
      } else {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setToastMessage("Erro ao carregar mesas.");
      }
    };
    fetchMesas();
  }, []);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const mesaId = mesaSelecionada;
    const nome = formData.get("nome")?.toString().trim() || "";
    const telefone = formData.get("telefone")?.toString().trim() || ""
    
    const { status, message, comandaId } = await comandaService.registrarTudo({
        mesaId,
        nome,
        telefone,
      });
  
      if (status === 200) {
        router.push(`/pedidos?comandaId=${comandaId}&registred=true`);
      } else {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setToastMessage(message || "Erro ao registrar dados.");
      }
    };
    return {
        mesas,
        mesaSelecionada,
        setMesaSelecionada,
        toastMessage,
        toastIsOpen,
        toastColor,
        handleSubmit,
      };
  }
  export default UseClienteForm