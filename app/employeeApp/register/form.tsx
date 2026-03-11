'use client'


import styles from "../../../styles/register.module.scss";
import ClientAction from "./action";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
export default function FormCLient({ mesas }: { mesas: any[] }) {
  return (
    <Form className={styles.form} action={ClientAction}>
        <p className={styles.subtitle}>
          <strong>Faça o registro</strong>
        </p>

        <FormGroup>
          <Label for="mesa" className={styles.label}>Escolha a Mesa</Label>
          <Input
            type="select"
            id="mesaId"
            name="mesaId"
           
           
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
   
        <Button type="submit" outline className={styles.formBtn}>
          Enviar
        </Button>
      </Form>  
  );
}