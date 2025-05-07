import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Label } from "reactstrap"

const ProductFilter=()=>{
const [category,setCategory]=useState<string[]>(['Bebidas','Entradas','Pratos','Sobremesas'])
const[selectedCategories,setSelectedCategories]=useState<string>('')
const [product,setProduct]=useState<any[]>([])
const [loading,setLoading]=useState<boolean>(false)
const [error,setError]=useState<string>("")
useEffect(()=>{
if(selectedCategories){
    fetchProducts(selectedCategories)
}
},[selectedCategories])
const fetchProducts=async(category:string)=>{
    setLoading(true)
    try {
        const response=await axios.get(`/produtos/filter?categoria=${category}`)
        setProduct(response.data);
    } catch (err:any) {
        setError(err.response?.data?.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
    }
    

return(
    <>
    <Container>
    <div>
        <label>Escolha uma categoria: </label>
        <select
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
        >
          <option value="">Selecione...</option>
          {category.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Exibição de Loading */}
      {loading && <p>Carregando...</p>}

      {/* Exibição de Erro */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Exibição de Produtos */}
      <div>
        {product.length > 0 ? (
          <ul>
            {product.map((product) => (
              <li key={product.id}>
                {product.name} - {product.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto encontrado para essa categoria.</p>
        )}
      </div>


    </Container>
    </>
)
}
export default ProductFilter