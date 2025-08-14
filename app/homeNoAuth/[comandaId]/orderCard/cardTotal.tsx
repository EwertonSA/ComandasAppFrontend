'use server'
import { Container, Button, Form, Input } from "reactstrap"
import { comandaService } from "@/src/services/comandaService"
import { cookies } from "next/headers"
import CancelAction from "./action"
import styles from '../../../../styles/getStyles.module.scss'
import PedidoItem from "./pedidoItem"

interface Produto {
  id: string
  nome: string
  preco: number
  thumbnailUrl?: string
}

interface PedidoProduto {
  produto: Produto
  quantidade: number
}

export interface Pedido {
  id: string
  total: string
  status: string
  pedidosProdutos: PedidoProduto[]
}

interface CardTotalProps {
  params: { comandaId: string }
  tipo: 'pendentes' | 'entregues'
}

const CardTotal = async ({ tipo, params }: CardTotalProps) => {
  const cookie = await cookies()
  const token = cookie.get("clientes-token")?.value || ''
  const { comandaId } = params
  const res = await comandaService.getPedidosComanda(token, comandaId)
  const pedidos: Pedido[] = (res?.pedidos || []).filter((p:any) => p.status === tipo)

  if (pedidos.length === 0) {
    return <p>"Nenhum pedido {tipo === 'pendentes' ? 'pendente' : 'entregue'}"</p>
  }

  return (
    <Container>
      {pedidos.map(pedido => (
        <div key={pedido.id}>
          <p className={styles.title}>Produtos:</p>
          <ul>
            {pedido.pedidosProdutos?.map((item, index) => {
              const defaultImage = '/images/default-thumbnailUrl.jpg'
              const imgUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage
              return (
                <li key={`${item.produto.id}-${index}`}>
                  {item.quantidade}x {item.produto.nome} - R$ {item.produto.preco}
                </li>
              )
            })}
          </ul>
          <p><strong>Id:</strong> {pedido.id}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
        <PedidoItem  pedido={pedido} tipo="pendentes" token={token}/>
        </div>
      ))}
    </Container>
  )
}

export default CardTotal
