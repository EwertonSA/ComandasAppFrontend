import api from "./api";
export type PedidosType={
    id:number,
    comandaId:number,
    total:number,
    status:string
}

export type ProductType={
    id:number,
    nome:string,
    descricao:string,
    preco:number,
    categoria:string
    pedidos?:PedidosType[];
}
const produtService={
getproducts: async()=>{
    const res=await api.get('/pedidos').catch((err)=>{
        console.log(err.response.data.message)
        return err.response
    })
    return res
}
}
export default produtService