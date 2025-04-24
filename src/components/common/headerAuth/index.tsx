import Link from "next/link"
import { Container, Form, Input } from "reactstrap"
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useState } from "react";
import { useRouter } from "next/router";
interface props{
    logoUrl:string;
    btnContent:string;
}
Modal.setAppElement("#__next")
const HeaderAuth=({logoUrl,btnContent}:props)=>{
    const router=useRouter();
    const [modalOpen, setModalOpen]= useState(false)

    const handlelogout=()=>{
        router.push('/')
    }
    const handleOpenModal=()=>{
        setModalOpen(true)
    }
    const handleCloseModal=()=>{
        setModalOpen(false)
    }
    return(
        <>
        <Container className={styles.nav}>
            <Link href={logoUrl}>
            <img src="/2.jpg" alt="" className={styles.imgLogoNav} />
            </Link>
            <div className="d-flex align-items-center">
               
                <p className={styles.user} onClick={handleOpenModal}>{btnContent}</p>
            </div>
          <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} 
          shouldCloseOnEsc={true} className={styles.modal} 
          overlayClassName={styles.overlay}> 
          <Link href='/home'>
          <p className={styles.modalLink}>Página inicial</p>
          </Link>
          <Link href='/clienteInfo'>
          <p className={styles.modalLink}>Comandas</p>
          </Link>
          <Link href="/register">
          <p className={styles.modalLink}>Registrar</p>
          </Link>
          <p className={styles.modalLink} onClick={handlelogout}>Sair</p>
          </Modal >
        </Container>
        </>
    )
}
export default HeaderAuth