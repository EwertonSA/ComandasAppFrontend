import Link from "next/link"
import { Container, Form, Input } from "reactstrap"
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useState } from "react";
import { useRouter } from "next/router";

Modal.setAppElement("#__next")
const HeaderAuth=()=>{
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
            <Link href='/home'>
            <img src="/2.jpg" alt="" className={styles.imgLogoNav} />
            </Link>
            <div className="d-flex align-items-center">
                <Form>
                    <Input 
                    name="search"
                    type="search"
                    placeholder="pesquisar" className={styles.input}/>
                </Form>
                <img src="/iconSearch.svg" alt="" className={styles.searchImg} />
                <p className={styles.user} onClick={handleOpenModal}>AB</p>
            </div>
          <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} 
          shouldCloseOnEsc={true} className={styles.modal} 
          overlayClassName={styles.overlay}> 
          <Link href='/produtos'>
          <p className={styles.modalLink}>Produtos</p>
          </Link>
          <Link href='/pedidos'>
          <p className={styles.modalLink}>Pedidos</p>
          </Link>
          <Link href="/pagamentos">
          <p className={styles.modalLink}>Total</p>
          </Link>
          <p className={styles.modalLink} onClick={handlelogout}>Sair</p>
        
          </Modal >
        </Container>
        </>
    )
}
export default HeaderAuth