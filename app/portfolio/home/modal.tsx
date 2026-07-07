'use client'
import Modal from 'react-modal';
import styles from '../../../src/components/common/headerAuth/styles.module.scss';
import { Container } from "reactstrap"
import { handleCloseModal, handleOpenModal } from "@/src/components/common/Modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const HeaderPort=({ logoUrl }: { logoUrl: string })=>{
  
         const pathname = usePathname();
          const [modalOpen, setModalOpen] = useState(false);
        
          useEffect(() => {
            const checkAndSetAppElement = () => {
              const modalRoot = document.getElementById('modal-root');
              if (modalRoot) {
                Modal.setAppElement('#modal-root');
              } else {
                         setTimeout(checkAndSetAppElement, 50);
              }
            };
                    checkAndSetAppElement();
          }, []);
                  const getBtn = () => {
            switch (pathname) {
                      default:
                return "Menu";
            }
          };
            return(
           <Container className={styles.nav}>
             <Link href={logoUrl}>
        <Image src="/test.png" alt="comandasLogo" className={styles.imgLogoNav} width={200} height={50} />
      </Link>
      <div className="d-flex align-items-center">
        <p className={styles.user} onClick={() => handleOpenModal(setModalOpen)}>
          {getBtn()}
        </p>
      </div>
             <Modal
        isOpen={modalOpen}
        onRequestClose={() => handleCloseModal(setModalOpen)}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
      
        <Link href="/portfolio/home">
          <p className={styles.modalLink}>Home</p>
        </Link>
        <Link href="/portfolio/aboutme">
          <p className={styles.modalLink}>AboutMe</p>
        </Link>
        <Link href="/portfolio/projects">
          <p className={styles.modalLink}>Projects</p>
        </Link>
          <Link href="/portfolio/certifications">
          <p className={styles.modalLink}>Certifications</p>
        </Link>
      </Modal>
    </Container>
    )
}