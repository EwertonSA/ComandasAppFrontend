const Splide = require("@splidejs/react-splide").default;
const SplideSlide = require("@splidejs/react-splide").SplideSlide;
import { ProductType } from "@/src/services/productService";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";

interface props{
    product:ProductType[];
}
const SlideComponent=({product}:props)=>{
    return <>
    <div>
        <Splide options={{
            type:"loop",
            perPage:4,
            perMove:1,
            pagination:false,
        }}>
           {
            product?.map((product)=>(
<SplideSlide key={product.id}>
    <SlideCard product={product}/>
</SplideSlide>
            ))
           }
        </Splide>
    </div>
    </>
}
export default SlideComponent;