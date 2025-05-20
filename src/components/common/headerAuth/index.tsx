import Link from "next/link"
import { Container, Form, Input } from "reactstrap"
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useState } from "react";
import { useRouter } from "next/router";
import { handleCloseModal, handleLogout, handleOpenModal } from "../Modal";
interface TabItem {
  label: string;
  href: string;
}

interface Props {
  logoUrl: string;
  btnContent: string;
  tabs: TabItem[];
}
Modal.setAppElement("#__next")
const HeaderAuth = ({ logoUrl, btnContent, tabs=[] }: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Container className={styles.nav}>
        <Link href={logoUrl}>
          <img src="/2.jpg" alt="" className={styles.imgLogoNav} />
        </Link>
        <div className="d-flex align-items-center">
          <p className={styles.user} onClick={() => handleOpenModal(setModalOpen)}>
            {btnContent}
          </p>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => handleCloseModal(setModalOpen)}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          {Array.isArray(tabs)&&tabs.map((tab, index) => (
            <Link key={index} href={tab.href}>
              <p className={styles.modalLink}>{tab.label}</p>
            </Link>
          ))}
          <p className={styles.modalLink} onClick={() => handleLogout(router)}>Sair</p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth