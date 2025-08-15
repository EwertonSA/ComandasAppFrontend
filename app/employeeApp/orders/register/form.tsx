'use client'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from '../../../../styles/register.module.scss'


import OrderAction from "./action"

import { usePedidosForm } from "./usePedidoForm"
import { useEffect, useState } from "react"

const OrderForm = () => {
  const [comandaId, setComandaId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setComandaId(params.get('comandaId') || '');
  }, []);

  const {
    entrada,
    setEntrada,
    suggestions,
    toastOpen,
    toastColor,
    toastMessage,
    handleKeyDown,
    handleEntradaChange,
    handleSuggestionClick,
    highlightIndex,
    itemRefs
  } = usePedidosForm();

  return (
    <main>
      <Container className="py-5">
        <p className={styles.formTitle}>Fazer pedidos</p>

        {toastOpen && (
          <div className={`text-white p-2 rounded ${toastColor}`}>
            {toastMessage}
          </div>
        )}

        <Form className={styles.form} action={OrderAction}>
          <p className="text-center"><strong>Pedido</strong></p>

          <FormGroup>
            <Label for="entrada" className={styles.label}>
              Produto*Quantidade:
            </Label>
            <Input
              name="entrada"
              id="entrada"
              type="text"
              placeholder="Ex: cerveja*3"
              value={entrada}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleEntradaChange(e.target.value)}
              autoComplete="off"
              className={styles.input}
            />
            <input type="hidden" name="comandaId" value={comandaId} />

            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((produto, index) => (
                  <li key={produto.id}
                    ref={(el) => { itemRefs.current[index] = el }}
                    onClick={() => handleSuggestionClick(produto)}
                    className={highlightIndex === index ? styles.active : ''}>
                    <img
                      src={
                        produto.thumbnailUrl
                          ? `${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`
                          : "/images/default-thumbnail.jpg"
                      }
                      alt={produto.nome}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", marginRight: "8px", borderRadius: "4px" }}
                    />
                    {produto.nome} - R$ {produto.preco}
                  </li>
                ))}
              </ul>
            )}
          </FormGroup>

          <Button outline className={styles.formBtn} type="submit">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </main>
  )
}
export default OrderForm
