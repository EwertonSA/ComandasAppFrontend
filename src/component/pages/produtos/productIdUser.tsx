import produtService from "@/src/services/productService"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import useSWR from "swr"
import { Button, Container, Form, Input } from "reactstrap"
import styles from '../../../../styles/getStyles.module.scss'
import pedidoService from "@/src/services/pedidoService"

const ProdutoIdForUser = () => {
  const router = useRouter()
  const { id } = router.query
  const [quantity, setQuantity] = useState(1)

  const { data, error } = useSWR(id ? id : null, produtService.getProductById)

  const handleOrder = async (ev?: FormEvent<HTMLFormElement>) => {
    if (ev) ev.preventDefault()

    const quantidade = quantity <= 0 ? 1 : quantity

    // Garantir que o ID do produto está presente
    const produtoId = id?.toString()
    if (!produtoId) {
      alert("ID do produto inválido.")
      return
    }

    // Garantir que o preço está carregado
    if (!data?.preco) {
      alert("Preço do produto não encontrado.")
      return
    }

    // Obter o valor manualmente do input de comandaId
    const comandaIdInput = document.getElementById("comandaId") as HTMLInputElement | null
    const comandaId = comandaIdInput?.value

    if (!comandaId) {
      alert("Comanda ID é obrigatório.")
      return
    }

    const total = quantidade * data.preco

    const params = {
      total,
      quantidade,
      comandaId,
      produtoId,
    }

    const { status } = await pedidoService.registerAll(params)
    if (status === 200 || status === 201) {
      router.push('/clienteInfo')
    }
  }

  if (error) return <p>Erro ao carregar.</p>
  if (!data) return <p>Loading...</p>




  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) || value < 1 ? 1 : value)
  }
   const defaultImage = "/images/default-thumbnail.jpg";
              const imgUrl = data.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${data.thumbnailUrl}`
                : defaultImage;
  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: 'center',
        height: '100%',
        minWidth: '100%',
      }}
      key={data.id}
    >
      <Container className={styles.container}>
       {imgUrl && <img src={imgUrl} alt="" className={styles.slide} />}
        <p className={styles.subTitle}>{data.nome}</p>
        <p className={styles.subTitle}>{data.descricao}</p>
        <p className={styles.subTitle}>{data.preco}</p>
        <p className={styles.subTitle}>{data.categoria}</p>

        <Form onSubmit={handleOrder} >
          <Input
            id="quantidade"
            type="number"
            name="quantidade"
            className={styles.input}
            value={quantity}
            onChange={handleChange}
          />

          <Input
            id="comandaId"
            name="comandaId"
            placeholder="Digite o ID da comanda"
            className={styles.input}
            required
          />

          <div className="d-flex flex-row m-3 gap-2 align-items-center justify-content-center">
            <Button onClick={handleIncrease} color="success" type="button">+</Button>
            <Button onClick={handleDecrease} color="danger" type="button">-</Button>
          </div>

          <Button type="submit">Pedir</Button>
        </Form>
      </Container>
    </main>
  )
}

export default ProdutoIdForUser
