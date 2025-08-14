'use server'


import styles from "../../styles/register.module.scss";



import { mesaService } from "@/src/services/mesaService";
import { cookies } from "next/headers";

const Register = async() => {

  const cookie=await cookies()
  const token=cookie.get('comandas-token')?.value ||''
  const {mesas}=await mesaService.getMesas(token)


  return (  
    <>
    
      
      <main>
        <div>
          <p className={styles.formTitle}>
            <strong>Bem vindo(a) ao cadastro</strong>
          </p>
       
        </div>

      </main>
    </>
  );
};

export default Register;
