'use server'

import FormCliente from "./form";
import { cookies } from "next/headers";
import { mesaService } from "@/src/services/mesaService";


export interface Props {
  searchParams: {
    comandaId?: string;
    registred?: string;
  };
}

const RegisterClient=async()=>{

  const cookie=await cookies()
  const token=cookie.get('comandas-token')?.value ||''

  const {mesas}=await mesaService.getMesas(token)


return   <>
    
      
      <main>
        <div>
          <p >
            <strong>Bem vindo(a) ao cadastro</strong>
          </p>
       <FormCliente mesas={mesas}/>
        </div>

      </main>
    </>
}
export default RegisterClient