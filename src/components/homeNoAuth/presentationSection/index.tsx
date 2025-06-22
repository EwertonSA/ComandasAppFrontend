import { Button, Col, Container, Row } from "reactstrap"
import styles from './styles.module.scss'
import Link from "next/link"
const PresentationSection=()=>{
return<> 
<Container className="py-4">
    <Row>
        <Col md className="d-flex flex-column justify-content-center align-items-start">
        <p className={styles.title}>Bem vindo ao Sitema de comandas para bares e restaurantes</p>
        <p className={styles.subtitle}>Acesse agora como colaborador usando o login usuario@example.com e senha 123123 para ter tenha acesso a aplicação completa. Entre como cliente para ter a experiência de fazer seus proprios pedidos.</p>
      <Link href='/indexLogin'>  
      <Button className={styles.btnCta} outline>
        <img src="/buttonPlay.svg" alt="" className={styles.btnImg} />
        Acesse Agora
      </Button>
      </Link>
        </Col>
        <Col md>
        <img className={styles.imgPresentation} src="/1.jpg" alt="" />
        </Col>
    </Row>
    <Row>
        <Col className="d-flex justify-content-center pt-5">
        <img src="/iconArrowDown.svg" alt=""  className={styles.arrowDown}/>
        </Col>
    </Row>
</Container>
</>
}
export default PresentationSection