'use client'

import TabsSwitcher from "@/src/components/common/switch/switchComponent"
import { useState } from "react"
import { Container } from "reactstrap"

import pedidoService from "@/src/services/pedidoService"

import CardLocal from "@/src/components/homeNoAuth/cards/carrinho"
import { Pedido } from "@/src/types/pedido"

interface CardProps {
  token: string
  pedidos: Pedido[]
}

const Switcher = ({ token, pedidos }: CardProps) => {
  const [abaAtiva, setAbaAtiva] = useState<'pendentes' | 'entregues'>('pendentes')

  // Filtra os pedidos com base na aba ativa
  const pedidosFiltrados = pedidos.filter(p => p.status === abaAtiva)

  const handleCancel = (pedido: Pedido) => {
    pedidoService.delete(token, pedido.id.toString(), "Cancelado")
      .then(() => {
        // Atualizar lista, ex: refetch, setState etc
        console.log("Pedido cancelado:", pedido.id)
      })
      .catch(err => {
        console.error("Erro ao cancelar pedido:", err)
      })
  }

  return (
    <Container>
      <TabsSwitcher
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        options={[
          { label: 'Pedidos pendentes', value: 'pendentes', color: 'warning' },
          { label: 'Pedidos entregues', value: 'entregues', color: 'success' }
        ]}
      />
      <CardLocal cancelar={handleCancel} pedidos={pedidosFiltrados} tipo={abaAtiva} />
    </Container>
  )
}

export default Switcher
