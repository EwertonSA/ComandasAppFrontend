import { cookies } from "next/headers";
import pedidoService from "@/src/services/pedidoService";
import SlidePedidosClient from "./client";

export default async function SlidePedidos() {
  const cookieStore = await cookies();
  const token = cookieStore.get("comandas-token")?.value ?? null;

  const pedidos = await pedidoService.pedidos(token);
  if (!pedidos) return <p>Erro ao carregar pedidos</p>;

  return <SlidePedidosClient pedidos={pedidos} />;
}
  
