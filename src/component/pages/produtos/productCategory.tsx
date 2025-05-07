import { useEffect, useState } from "react";
import productService from "../../../services/productService";
import styles from "../../../../styles/getStyles.module.scss"
export default function Produtos() {
  const [produtos, setProdutos] = useState<{ [key: string]: any[] }>({});
  const categorias = ["Bebidas", "Entradas", "Pratos", "Sobremesas"];

  useEffect(() => {
    async function fetchProdutos() {
      const resultado: { [key: string]: any[] } = {};

      for (const categoria of categorias) {
        const data = await productService.getByCategories(categoria);
        console.log("🔍 Produtos recebidos da API:", data);
        resultado[categoria] = data;
   
      }

      setProdutos(resultado);
    }

    fetchProdutos();
  }, []);

  return (
    <div >
      {categorias.map((categoria) => (
        <section key={categoria} >
          <h2 className={styles.title}>{categoria}</h2>
          <div className={styles.main} >
            {produtos[categoria]?.length > 0 ? (
              produtos[categoria].map((produto) => (
                <div
                  key={produto.id}
                  className={styles.container}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`}  className={styles.slide} 
                    alt={produto.nome}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <strong>R${produto.preco}</strong>
                </div>
              ))
            ) : (
              <p>Sem produtos cadastrados nessa categoria.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
