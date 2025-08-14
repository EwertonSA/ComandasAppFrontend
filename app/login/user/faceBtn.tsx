import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'reactstrap'
import styles from '../../../styles/getStyles.module.scss'
export default function FacebookButton() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
    <Button outline color='primary'>
      <FontAwesomeIcon icon={faFacebook} className={styles.faceIcon}/> Login com Facebook
    </Button>
    </div>
  )
}