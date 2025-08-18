
import { comandaService } from "@/src/services/comandaService"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { NextRouter } from "next/router"
export async function handleLogout(router: AppRouterInstance) {
 await fetch('/api/auth/logout',{
  method:"POST",
  credentials:'include'
 })
 router.push('/index')
}

export const handleOpenModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(true)
}
export const handleCloseModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(false)
}
export async function handleLogoutClientes(
  router: AppRouterInstance,
  comandaId: string,
  totalDelivered: number
) {
  const token = typeof window !== "undefined"
    ? sessionStorage.getItem("comandas-token")
    : null;

  try {
    const comanda = await comandaService.getPedidosComanda(token, comandaId);

    if (comanda.status === 'pago' && totalDelivered === 0) {
      sessionStorage.clear();
      await router.push('/indexLogin');
    } else {
      alert('Você só pode sair após concluir o pagamento da comanda.');
    }
  } catch (error) {
    console.error('Erro ao verificar status da comanda:', error);
    alert('Erro ao verificar pagamento. Tente novamente.');
  }
}
