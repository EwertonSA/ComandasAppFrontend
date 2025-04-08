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
    getproducts: async () => {
        try {
          const res = await api.get('/produtos');
          console.log("📦 Produtos recebidos no getStaticProps:", res.data);
          return { data: res.data.produtos || [] };
        } catch (err: any) {
         
          return { data: [] }; 
        }
      },

}
export default produtService