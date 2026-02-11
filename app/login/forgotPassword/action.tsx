"use server"

import authService from "@/src/services/authService";
import { redirect } from "next/navigation";

const forgotPassword=async(formData:FormData)=>{
  const email = formData.get("email")?.toString() || "";
  const res=await authService.forgotPassword(email)
  if(!res){
       return console.error("Email de recuperação não existe")
  }
  if(res){

    redirect("/login/redirect")
     
  }
}
  export default forgotPassword
