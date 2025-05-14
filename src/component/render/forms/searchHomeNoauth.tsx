import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { usePedidosForm } from "../../hooks/pedidos/usePedidoForm"
import styles from "../../../../styles/register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
const SearchHomeNoAuth=()=>{
  
    const {
        entrada,
        setEntrada,
        suggestions,
        toastOpen,
        toastColor,
        toastMessage,
        handleOrders,
        handleEntradaChange, 
        handleSuggestionClick
      } = usePedidosForm((comandaId)=>router.push(`/homeNoAuth?comandaId=${comandaId}`));
    
 const router=useRouter()
      return(
        <>
        <div>
            <Container >
                <p className={styles.formTitle}>Nossos produtos</p>
                {toastOpen && (
            <div className={`text-white p-2 rounded ${toastColor}`}>
              {toastMessage}
            </div>
          )}
    <Form onSubmit={handleOrders}>
        <FormGroup>
            <Label for='entrada'  className={styles.title}>Pesquisar</Label>
          
          <div className="d-flex align-items-center justify-content-center gap-3"> 
             <Input   id="entrada"
                type="text" 
                placeholder="Ex: cerveja*3"
                value={entrada}
                onChange={(e) => handleEntradaChange(e.target.value)}
                autoComplete="off"
                className={styles.input}/>
        <Button outline type="submit"><img src="/iconSearch.svg" alt="" className={styles.searchCardImg} /></Button>
                   {suggestions.length > 0 && (
                
                <ul className={styles.suggestions}>
                  {suggestions.map((produto) => (
                    <li key={produto.id} onClick={() => handleSuggestionClick(produto)}>
                      <Link href={`/produtos/${produto.id}?comandaId=${router.query.comandaId}`}>
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
                 </Link>
                    </li>
                  ))}
                </ul>
              
              )}
      
              </div>
        </FormGroup>
        
    </Form>
            </Container>
        </div>
        </>
      )
}
export default SearchHomeNoAuth