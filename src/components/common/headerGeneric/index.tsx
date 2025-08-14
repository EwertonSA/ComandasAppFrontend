'use client'

import { Button, Container } from 'reactstrap';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { handleCloseModal, handleLogoutClientes, handleOpenModal } from '../Modal';
import { usePedidosComanda } from '@/src/component/hooks/pedidos/usePedidosComanda';

interface props {
  logoUrl: string;
}

const HeaderGeneric = ({ logoUrl }: props) => {
  const router = useRouter();
  const pathname = usePathname();
const params=useParams()
const comandaId=params.comandaId as string

  const token = typeof window !== 'undefined'
    ? sessionStorage.getItem('cliente-token')
    : null;

  const [modalOpen, setModalOpen] = useState(false);

  const {
    pedidos, error, mutate, abaAtiva, setAbaAtiva,
    pedidosPendentes, pedidosEntregues,
    handleCancel, delivered, totalDelivered
  } = usePedidosComanda(token, comandaId);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#modal-root');
    }
  }, []);

  const getBtnContent = () => {
    switch (pathname) {
      case '/homeNoAuth/[comanda':
        return 'Página inicial';
      case '/homeNoAuth/[comandaId]/payment':
        return 'Carrinho';
      case '/pagamentoCliente':
        return 'Pagamento';
      default:
        return 'Menu';
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link href={`/homeNoAuth/${comandaId}`}>
            <img src="/2.jpg" alt="" className={styles.headerLogo} />
          </Link>
          <div className={styles.button}>
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
              <Link href={`/homeNoAuth/${comandaId}`} legacyBehavior>
                <a className={styles.modalLink}>Página inicial</a>
              </Link>
              <Link href={`/homeNoAuth/${comandaId}/orderCard`} legacyBehavior>
                <a className={styles.modalLink}>Carrinho</a>
              </Link>
              <Link href={`/homeNoAuth/${comandaId}/payment`} legacyBehavior>
                <a className={styles.modalLink}>Pagamento</a>
              </Link>
              <a
                className={styles.modalLink}
                onClick={() => handleLogoutClientes(router, comandaId, totalDelivered)}
              >
                Sair
              </a>
            </Modal>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeaderGeneric;
