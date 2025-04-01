import { Container } from "reactstrap"
import styles from './styles.module.scss'
const CardSection=()=>{
    return(
        <>
        <p className={styles.sectionTitle}>O QUE VOCÊ VAI ACESSAR</p>
        <Container className="d-flex flex-wrap justify-contente-center gap-4 pb-5">
            <div className={styles.card1}>
                <p className={styles.cardTitle}>Entradas</p>
                <p className={styles.cardDescription}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita itaque ipsa blanditiis beatae harum minus, delectus odit cum earum deleniti.
                </p>
            </div>
            <div className={styles.card2}>
                <p className={styles.cardTitle}>Porções.</p>
                <p className={styles.cardDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dicta similique non laboriosam tenetur at, accusantium 
                    saepe culpa consectetur, harum, numquam voluptas. Aperiam deserunt saepe cum.</p>
            </div>
            <div className={styles.card3}>
                <p className={styles.cardTitle}>Pratos</p>
                <p className={styles.cardDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dicta similique non laboriosam tenetur at, accusantium 
                    saepe culpa consectetur, harum, numquam voluptas. Aperiam deserunt saepe cum.</p>
            </div>
            <div className={styles.card4}>
                <p className={styles.cardTitle}>Bedidas</p>
                <p className={styles.cardDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dicta similique non laboriosam tenetur at, accusantium 
                    saepe culpa consectetur, harum, numquam voluptas. Aperiam deserunt saepe cum.</p>
            </div>
            <div className={styles.card5}>
                <p className={styles.cardTitle}>Drinks</p>
                <p className={styles.cardDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dicta similique non laboriosam tenetur at, accusantium 
                    saepe culpa consectetur, harum, numquam voluptas. Aperiam deserunt saepe cum.</p>
            </div>
            <div className={styles.card6}>
                <p className={styles.cardTitle}>Sobremesas</p>
                <p className={styles.cardDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dicta similique non laboriosam tenetur at, accusantium 
                    saepe culpa consectetur, harum, numquam voluptas. Aperiam deserunt saepe cum.</p>
            </div>
        </Container>
        </>
    )
}
export default CardSection