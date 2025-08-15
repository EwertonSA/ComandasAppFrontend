import SlideCard from "@/src/components/common/slideCard"
import SlideComponent from "@/src/components/common/slideComponent"
import { ProductType } from "@/src/services/productService";
export interface Props {
  getproduts: ProductType[] | { produtos: ProductType[] };
}

const SlideClientComp=({ getproduts }: Props)=>{
     const produtosArray = Array.isArray(getproduts)
    ? getproduts
    : Array.isArray((getproduts as { produtos: ProductType[] }).produtos)
    ? (getproduts as { produtos: ProductType[] }).produtos
    : [];

return(
       <SlideComponent itemsLength={produtosArray.length}>
        {produtosArray.map((product, index) => (
          <SlideCard key={index} product={product} />
        ))}
      </SlideComponent>

)
}
export default SlideClientComp