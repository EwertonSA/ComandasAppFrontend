'use client'
import React, { useEffect, useState, useTransition, useRef } from "react";


import SearchAction from "@/app/employeeApp/orders/register/searchAction";
import { ProductType } from "@/src/services/productService";
type UsePedidosFormOptions = {
  isRegistred?: boolean;
  comandaId?: string;
  onSuccess?: (comandaId: string) => void;
};
export const usePedidosForm = (options?: UsePedidosFormOptions) => {
 const { isRegistred = false, comandaId, onSuccess } = options || {};

  const [entrada, setEntrada] = useState("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [produtoId, setProdutoId] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
const [isPending, startTransition] = useTransition()
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(-1);

useEffect(() => {
  if (isRegistred) {
    setToastColor("bg-success");
    setToastOpen(true);
    setToastMessage("Cadastro bem sucedido");
    setEntrada("");
    setTimeout(() => setToastOpen(false), 3000);
  }
}, [isRegistred]);




  const handleEntradaChange = async (value: string) => {
    setEntrada(value);

    const nome = value.split("*")[0];
    if (nome.length >= 2) {
      startTransition(()=>{
        SearchAction(nome).then((result)=>{
          setSuggestions(result)
          setHighlightIndex(-1)
        })
      })
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

const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
if(e.key==="ArrowDown"){
  e.preventDefault()
  setHighlightIndex((prev)=>Math.min(prev+1, suggestions.length -1))
}
if(e.key==="ArrowUp"){
  e.preventDefault()
  setHighlightIndex((prev)=>Math.max(prev-1,0))
}
if(e.key==='Enter'){
  e.preventDefault()
  if(highlightIndex>=0 && highlightIndex<suggestions.length){
const selected=suggestions[highlightIndex]
setEntrada(selected.nome)
setSuggestions([])
  }
}
if(e.key==='Escape'){
  setSuggestions([])
}
} 
const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

useEffect(() => {
  if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
    itemRefs.current[highlightIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}, [highlightIndex]);
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
   handleKeyDown,
    handleEntradaChange,
    handleSuggestionClick,
    highlightIndex,
    itemRefs,
  };
};
