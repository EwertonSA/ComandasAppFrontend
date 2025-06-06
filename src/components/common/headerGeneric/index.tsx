import { Button, Container} from 'reactstrap';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleCloseModal, handleLogout, handleLogoutClientes, handleOpenModal } from '../Modal';
import { usePedidosComanda } from '@/src/component/hooks/pedidos/usePedidosComanda';

interface props{
    logoUrl:string;
    btnUrl:string;
    btnContent:string;
}
const HeaderGeneric=({ logoUrl }: { logoUrl: string })=>{
        const router=useRouter();
   
        const [modalOpen, setModalOpen]= useState(false)
        const comandaId=router.query.comandaId as string
         const {
    pedidos,error,mutate,abaAtiva,setAbaAtiva,pedidosPendentes,pedidosEntregues,handleCancel,delivered,totalDelivered}=usePedidosComanda(comandaId)
          useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next'); // Next.js monta a app aqui por padrão
    }
  }, []);
   const getBtnContent = () => {
    switch (router.pathname) {
      case "/homeNoAuth":
        return "Página inicial";
    
        case '/carrinho':
          return "Carrinho";
       
      case "/pagamentoCliente":
     
          return "Pagamento";
    
      default:
        return "Menu";
    }
  };
    return<>
    <div className={styles.header}>
<Container className={styles.headerContainer}>
    <Link href={logoUrl}>
    <img src="/2.jpg" alt="" className={styles.headerLogo} />
    </Link>
    <div className={styles.button}>
           <div className="d-flex align-items-center">
                <p className={styles.user} onClick={() => handleOpenModal(setModalOpen)}>
            {getBtnContent()}
          </p>
            </div>
  <Modal isOpen={modalOpen} onRequestClose={()=>handleCloseModal(setModalOpen)} 
          shouldCloseOnEsc={true} className={styles.modal} 
          overlayClassName={styles.overlay}> 
          <Link href={`/homeNoAuth?comandaId=${comandaId}`} legacyBehavior>
          <a className={styles.modalLink}>Página inicial</a>
          </Link >
          <Link href={`/carrinho?comandaId=${comandaId}`} legacyBehavior>
          <a className={styles.modalLink}>Carrinho</a>
          </Link>
          <Link href={`/pagamentoCliente?comandaId=${comandaId}`} legacyBehavior>
          <a className={styles.modalLink}>Pagamento</a>
          </Link>
          <a className={styles.modalLink} onClick={()=>handleLogoutClientes(router,comandaId,totalDelivered)}>Sair</a>
          </Modal >
    </div>
    
</Container>
    </div>
    </>
}
export default HeaderGeneric