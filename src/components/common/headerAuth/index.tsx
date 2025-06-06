
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useState } from "react";
import { useRouter } from "next/router";
import { handleCloseModal, handleLogout, handleLogoutClientes, handleOpenModal } from "../Modal";
import Link from "next/link";
import { Container } from "reactstrap";

Modal.setAppElement("#__next");

const HeaderAuth = ({ logoUrl }: { logoUrl: string }) => {
  const router = useRouter();
  const comandaId = router.query.comandaId as string;
  const [modalOpen, setModalOpen] = useState(false);

  // Mapeia cada rota para um texto
  const getBtnContent = () => {
    switch (router.pathname) {
      case "/home":
        return "Página inicial";
    
        case "/allClients":
          return "Cliente Info";
       
      case "/clienteInfo":
     
          return "Comandas";
      case "/register":
        return "Registrar";
      default:
        return "Menu";
    }
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href={logoUrl}>
          <img src="/2.jpg" alt="" className={styles.imgLogoNav} />
        </Link>
        <div className="d-flex align-items-center">
          <p className={styles.user} onClick={() => handleOpenModal(setModalOpen)}>
            {getBtnContent()}
          </p>
        </div>

        <Modal
          isOpen={modalOpen}
          onRequestClose={() => handleCloseModal(setModalOpen)}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <Link href="/home">
            <p className={styles.modalLink}>Página inicial</p>
          </Link>
          <Link href="/clienteInfo">
            <p className={styles.modalLink}>Comandas</p>
          </Link>
          <Link href="/allClients">
            <p className={styles.modalLink}>Cliente Info</p>
          </Link>
          <Link href="/register">
            <p className={styles.modalLink}>Registrar</p>
          </Link>
          <p className={styles.modalLink} onClick={() => handleLogout(router)}>Sair</p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth;
