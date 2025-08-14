'use client'
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleCloseModal, handleLogout, handleLogoutClientes, handleOpenModal } from "../Modal";
import Link from "next/link";
import { Container } from "reactstrap";
import Image from 'next/image';


const HeaderAuth = ({ logoUrl }: { logoUrl: string }) => {
  const router = useRouter();
  const searchParams=useSearchParams()
  const pathname=usePathname()
  const comandaId = searchParams.get('comandaId') as string;
  const [modalOpen, setModalOpen] = useState(false);

 useEffect(() => {
    const checkAndSetAppElement = () => {
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot) {
        Modal.setAppElement('#modal-root');
      } else {
        // Se não existe ainda, tenta novamente em 50ms
        setTimeout(checkAndSetAppElement, 50);
      }
    };

    checkAndSetAppElement();
  }, []);
  const getBtnContent = () => {
    switch (pathname) {
      case "/home":
        return "Página inicial";
    
        case "/clients":
          return "Cliente Info";
       
      case "/comandas":
     
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
          <Image src="/2.jpg" alt="comandasLogo" className={styles.imgLogoNav}  width={100} height={50}/>
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
          <Link href="/employeeApp">
            <p className={styles.modalLink}>Página inicial</p>
          </Link>
          <Link href="/employeeApp/comandas">
            <p className={styles.modalLink}>Comandas</p>
          </Link>
          <Link href="/employeeApp/clients">
            <p className={styles.modalLink}>Cliente Info</p>
          </Link>
          <Link href="/employeeApp/register">
            <p className={styles.modalLink}>Registrar</p>
          </Link>
          <p className={styles.modalLink} onClick={() => handleLogout(router)}>Sair</p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth;
