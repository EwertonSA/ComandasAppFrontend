'use client'
import styles from '../../../../styles/getStyles.module.scss'
import { Container, Input, Button, Form} from 'reactstrap'
import handleOrderAction from './actions'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export interface OrderProductProps {
  produto: {
    id: number
    nome: string
    descricao: string
    preco: string
    categoria: string
    thumbnailUrl?: string
  }
  comandaId: string
  produtoId:string
}

const OrderFormView = ({ produto,produtoId }: OrderProductProps) => {
const imgUrl = produto.thumbnailUrl
  ? `http://localhost:3001/${produto.thumbnailUrl}`
  : null

  return (
    <main className={styles.main} style={{
      backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundPosition: 'center',
      height: '100%',
      minWidth: '100%'
    }} key={produto.id}>
      <Container className={styles.container}>
        {imgUrl&&(
 <Image src={imgUrl} alt="ProductImg" width={50} height={50}/>
        )}
        
        <p className={styles.subTitle}>{produto.nome}</p>
        <p className={styles.subTitle}>{produto.descricao}</p>
        <p className={styles.subTitle}>R$ {produto.preco}</p>
        <p className={styles.subTitle}>{produto.categoria}</p>

        <Form action={handleOrderAction}>
          <Input type="hidden" name="produtoId" value={produtoId} />

    <Input
      id="comandaId"
      name="comandaId"
      type="number"
      placeholder="Digite o número da comanda"
      required
      className={styles.input}
/>

          <Input
            id="quantidade"
            type="number"
            name="quantidade"
            className={styles.input}
            min={1}
            defaultValue={1}
          />

          <Button type="submit" color="primary" className="mt-3">Pedir</Button>
        </Form>
      </Container>
    </main>
  )
}

export default OrderFormView
