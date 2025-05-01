import { Button, Col, Container, Row } from "reactstrap"
import styles from './styles.module.scss'
import Link from "next/link"
const PresentationSection=()=>{
return<> 
<Container className="py-4">
    <Row>
        <Col md className="d-flex flex-column justify-content-center align-items-start">
        <p className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, quibusdam!</p>
        <p className={styles.subtitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero obcaecati, quaerat voluptatum totam iusto doloremque!</p>
      <Link href='/login'>  
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