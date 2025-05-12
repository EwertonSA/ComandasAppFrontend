import { NextRouter } from "next/router"

export function handleLogout(router:NextRouter){
  
sessionStorage.clear()
router.push('/indexLogin')
}
export const handleOpenModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(true)
}
export const handleCloseModal=(setModalOpen:(v:boolean)=>void)=>{
    setModalOpen(false)
}