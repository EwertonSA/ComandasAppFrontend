import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'reactstrap'
import styles from '../../../styles/getStyles.module.scss'
export default function OauthButton() {
      const handleFaceLogin=()=>{
  window.location.href="https://esadev.com.br/api/auth/facebook/redirect"
}
  // Login OAuth externos
  const handleLoginLinkedIn = () => {
    window.location.href = "https://esadev.com.br/api/auth/linkedin/redirect/";
  };

  const handleLoginGoogle = () => {
    window.location.href = "https://esadev.com.br/api/auth/google";
  };
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
    <Button className={styles.oauthbtn}outline color='primary' onClick={handleFaceLogin}>
      <FontAwesomeIcon icon={faFacebook} className={styles.faceIcon}/> Login com Facebook
    </Button>
    <Button className={styles.oauthbtn} outline onClick={handleLoginLinkedIn}>
      <FontAwesomeIcon icon={faLinkedin} /> Login com LinkedIn
    </Button>
    <Button  color='success' className={styles.oauthbtn} outline onClick={handleLoginGoogle}>
      <FontAwesomeIcon icon={faGoogle} /> Login com Google
    </Button>
    </div>
  )
}