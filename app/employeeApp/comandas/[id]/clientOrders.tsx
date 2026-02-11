'use client'

import { useState, useMemo } from "react"
import TabsSwitcher from "@/src/components/common/switch/switchComponent"
import PedidosList from "./pedidoList"
import Link from "next/link"
import { Button } from "reactstrap"
import styles from '../../../../styles/getStyles.module.scss'
import PedidosList2 from "./pedidoList2"
import OrdersList from "./pedidoList2"
interface Props {
  pedidos: any[]
  onCancelar: (pedido: any) => void
  id:string
}

export default function ClientOrders({ pedidos, onCancelar,id }: Props) {
  const [abaAtiva, setAbaAtiva] = useState<'pendentes' | 'entregues'>('pendentes')

  const pedidosPendentes = useMemo(
    () => pedidos.filter(p => p.status.toLowerCase() !== 'entregue'),
    [pedidos]
  )

  const pedidosEntregues = useMemo(
    () => pedidos.filter(p => p.status.toLowerCase() === 'entregue'),
    [pedidos]
  )

  const totalDelivered = useMemo(() => {
    return pedidosEntregues.reduce((acc, pedido) => {
      return acc + Number(pedido.total || 0)
    }, 0).toFixed(2)
  }, [pedidosEntregues])


  return (
    <>
      <h1>Pedidos da comanda {id}</h1>
      <TabsSwitcher
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        options={[
          { label: 'Pedidos pendentes', value: 'pendentes', color: 'warning' },
          { label: 'Pedidos entregues', value: 'entregues', color: 'success' },
        ]}
      />
{abaAtiva === 'pendentes' ? (
  <OrdersList pedidos={pedidosPendentes} tipo="pendentes" onCancelar={onCancelar} comandaId={id}/>
) : (
  <OrdersList pedidos={pedidosEntregues} tipo="entregues" onCancelar={onCancelar}  comandaId={id}/>
)}
 <p className={styles.title}>Valor total entregue: R$ {totalDelivered}</p>

        <Link href={`/employeeApp/payments/${id}`} className={styles.btn}>
          <Button>Pagamento</Button>
        </Link>
    </>
  )
}
