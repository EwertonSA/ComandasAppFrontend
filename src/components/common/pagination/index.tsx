import { Button } from "reactstrap";
import styles from  "../../../../styles/getStyles.module.scss"
import { useState } from "react";
interface PaginationProps{
    page:number;
    setPage:(page:number)=>void;
    totalPages:number
}
const PaginationComponent=({page,setPage,totalPages}:PaginationProps)=>{
    return(
  <div className={styles.main}>
             <Button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
     
          Anterior
        </Button>
        <span className={styles.pageInfo}>
          Página {page} de {totalPages}
        </span>

           <Button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages}>
       
        
          Próxima
        </Button>
      </div>
    )
    }
    export default PaginationComponent