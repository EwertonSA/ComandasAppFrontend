import { Splide, SplideSlide } from "@splidejs/react-splide";


import { ProductType } from "@/src/services/productService";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";

interface props{
    product:ProductType[];
}
const SlideComponent=({product}:props)=>{
    let slideCount=0
    if(product?.length>4){
        slideCount=4
    }else if(product){
        slideCount=product.length
    }
    return <>
    <div className="d-flex flex-column align-items-center py-5">
        <Splide options={{
            type:"loop",
            perPage:slideCount,
            perMove:1,
            width:slideCount*300,
            pagination:false,
            arrows:product?.length>4 ? true:false,
            drag:product?.length>4 ? true:false,
            breakpoints:{
                1200:{
                    perPage:slideCount>=2 ? 2:1,
                    arrows:product?.length>2 ? true:false,
                    drag:product?.length>2 ? true:false,
                    width:slideCount>= 2 ? 600:300,
                },
                600:{
                    perPage:1,
                    arrows:product?.length>1 ? true:false,
                    drag:product?.length>1 ? true:false,
                    width:300
                },
                300:{
                   perPage:1,
                    width:230
                }
            }
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