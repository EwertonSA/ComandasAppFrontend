import { usePedidosComanda } from "@/src/component/hooks/pedidos/usePedidosComanda"
import { comandaService } from "@/src/services/comandaService"
import { NextRouter } from "next/router"
 
export function handleLogout(router:NextRouter){
  
sessionStorage.clear()
router.push('/indexLogin')
}
export const handleOpenModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(true)
}
export const handleCloseModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(false)
}

export async function handleLogoutClientes(router: NextRouter, comandaId: string, totalDelivered: number) {
    
  try {
    const comanda = await comandaService.getPedidosComanda(comandaId);
 

if(comanda.status ==='pago'&&totalDelivered ===0){
       sessionStorage.clear();
      router.push('/indexLogin');
}else{
  alert('Você só pode sair após concluir o pagamento da comanda.');
}

  } catch (error) {
    console.error('Erro ao verificar status da comanda:', error);
    alert('Erro ao verificar pagamento. Tente novamente.');
  }
}