import { Button, Container, Modal } from 'reactstrap';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { handleCloseModal, handleLogout, handleOpenModal } from '../Modal';

interface props{
    logoUrl:string;
    btnUrl:string;
    btnContent:string;
}
const HeaderNoAuth=({logoUrl,btnContent}:props)=>{
        const router=useRouter();
        const [modalOpen, setModalOpen]= useState(false)
        const {comandaId}=router.query
        
    return<>
    <div className={styles.header}>
<Container className={styles.headerContainer}>
    <Link href={logoUrl}>
    <img src="/2.jpg" alt="" className={styles.headerLogo} />
    </Link>
    <div className={styles.button}>
           <div className="d-flex align-items-center">
               
                <p className={styles.user} onClick={()=>handleOpenModal(setModalOpen)}>{btnContent}</p>
            </div>
  <Modal isOpen={modalOpen} onRequestClose={()=>handleCloseModal(setModalOpen)} 
          shouldCloseOnEsc={true} className={styles.modal} 
          overlayClassName={styles.overlay}> 
          <Link href={`/homeNoAuth?comandaId=${comandaId}`}>
          <p className={styles.modalLink}>Página inicial</p>
          </Link>
          <Link href={`/carrinho?comandaId=${comandaId}`}>
          <p className={styles.modalLink}>Carrinho</p>
          </Link>
          <Link href={`/pagamentoCliente?comandaId=${comandaId}`}>
          <p className={styles.modalLink}>Pagamento</p>
          </Link>
          <p className={styles.modalLink} onClick={()=>handleLogout(router)}>Sair</p>
          </Modal >
    </div>
    
</Container>
    </div>
    </>
}
export default HeaderNoAuth