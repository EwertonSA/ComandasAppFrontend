import { Button } from "reactstrap"
import styles from '../../../styles/getStyles.module.scss'
import FacebookButton from "./faceBtn";

 const OauthButton=()=>{
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
return(
    
              <div className={styles.oauth}>
              <Button className={styles.faceBtn} onClick={handleFaceLogin}><FacebookButton /></Button>
              <Button onClick={handleLoginLinkedIn}>Login com LinkedIn</Button>
              <Button onClick={handleLoginGoogle}>Login com Google</Button>
              </div>
          
)
 }
 export default OauthButton