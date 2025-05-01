import {
    Button,Container,Form,FormGroup,Input,Label,
  } from "reactstrap";
  import styles from "../../../../styles/register.module.scss"

  interface ClienteFormProps{
    mesas:any;
    mesaSelecionada:string;
    setMesaSelecionada:(value:string)=>void;
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
  }
  const ClienteForm=({
    mesas
    ,mesaSelecionada,
    setMesaSelecionada,
    handleSubmit,
  }:ClienteFormProps)=>{
    return(
        <Form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.subtitle}>
          <strong>Faça o registro</strong>
        </p>

        <FormGroup>
          <Label for="mesa" className={styles.label}>Escolha a Mesa</Label>
          <Input
            type="number"
            id="mesaId"
            name="mesaId"
            value={mesaSelecionada}
            onChange={(e) => setMesaSelecionada(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Selecione uma mesa</option>
            {mesas.map((mesa:any) => (
              <option key={mesa.id} value={mesa.id}>
                Mesa {mesa.numero} (Capacidade: {mesa.capacidade})
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="nome" className={styles.label}>Nome</Label>
          <Input
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome do cliente"
            required
            maxLength={20}
            className={styles.inputName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="telefone" className={styles.label}>Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="+55 (xx) 11 9xxxx-xxxx"
            data-mask="[-]+55 (00) 00000-0000"
            className={styles.input}
          />
        </FormGroup>
        <Button type="submit" outline className={styles.formBtn}>
          Enviar
        </Button>
      </Form>  
    )
  }
  export default ClienteForm