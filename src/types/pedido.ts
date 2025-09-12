// app/employeeApp/comandas/[id]/pedidoList.ts

export interface Produto {
  id: number;   // ❌ atualmente number
  nome: string;
  preco: number;
  thumbnailUrl?: string;
}

export interface PedidoProduto {
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id: number;
  pedidosProdutos?: PedidoProduto[];
  total: number;
  status: string;
}
