

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import produtService, { ProductType } from "@/src/services/productService";
import pedidoService from "@/src/services/pedidoService";

export const usePedidosForm = (onSuccess?: (comandaId:string) => void) => {
  const router = useRouter();

  const [entrada, setEntrada] = useState("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [produtoId, setProdutoId] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.registred?.toString() === "true") {
      setToastColor("bg-success");
      setToastOpen(true);
      setToastMessage("Cadastro bem sucedido");
      setEntrada("");
      setTimeout(() => setToastOpen(false), 3000);
    }
  }, [router.query]);

  const handleOrders = async (ev: FormEvent<HTMLFormElement>, overrideProdutoId?: string,
  overrideQuantidade?: number,entradaOverride?:string) => {
    ev.preventDefault();
  console.log("handleOrders chamado com:", {
  overrideProdutoId,
  overrideQuantidade
});
    try {
      if (!router.isReady) {
        alert("Aguarde o carregamento da página");
        return;
      }
  
      const comandaId = router.query.comandaId?.toString();
      if (!comandaId) {
        alert("Comanda inexistente");
        return;
      }
  
      // SE o produtoId já estiver preenchido (veio da página específica)
      let finalProdutoId =overrideProdutoId ?? produtoId;
      let finalQuantidade =overrideQuantidade ?? quantidade;
      
      // SE for uma entrada manual no campo "nome*quantidade"
      if (!finalProdutoId  || finalProdutoId.trim() === "") {
        const entradaFinal = entradaOverride ?? entrada;
      const [nome, qtdStr] = entradaFinal.split("*");
      const parsedQuantidade = Number(qtdStr);
        if (!nome || isNaN(parsedQuantidade)) {
          alert("Entrada inválida. Use o formato 'nome*quantidade'");
          return;
        }
  
        const res = await produtService.findByName(nome, 1, 1);
        const produto = res?.produtos?.[0];
  
        if (!produto) {
          alert("Produto não encontrado");
          return;
        }
  
        finalProdutoId = produto.id;
        finalQuantidade = parsedQuantidade;
      }
  
      const pedidoRes = await pedidoService.registerAll({
        total: 0,
        comandaId,
        produtoId: finalProdutoId,
        quantidade: finalQuantidade,
      });
  
      if (pedidoRes?.status === 200) {
        setToastColor("bg-success");
        setToastMessage("Produto cadastrado com sucesso!");
        setToastOpen(true);
        if (onSuccess) {
          onSuccess(comandaId);
         }else{ router.push("/clienteInfo");}
      } else {
        alert("Erro ao cadastrar: " + pedidoRes?.message);
      }
    } catch (err) {
      console.error("Erro capturado no handleOrders:", err);
      alert("Erro inesperado ao enviar o pedido.");
    }
  };
  

  const handleEntradaChange = async (value: string) => {
    setEntrada(value);
    const nome = value.split("*")[0];
    if (nome.length >= 2) {
      const result = await produtService.findByName(nome, 1, 5);
      setSuggestions(result.produtos);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (produto: ProductType) => {
    const partes = entrada.split("*");
    const qtd = partes[1] ? Number(partes[1]) : 1;
    setProdutoId(produto.id.toString());
    setQuantidade(qtd);
    setEntrada(`${produto.nome}*${qtd}`);
    setSuggestions([]);
  };

  return {
    entrada,
    setEntrada,
    quantidade,
    produtoId,
    setQuantidade,
    suggestions,
    toastOpen,
    toastColor,
    toastMessage,
    handleOrders,
    handleEntradaChange,
    handleSuggestionClick
  };
};
