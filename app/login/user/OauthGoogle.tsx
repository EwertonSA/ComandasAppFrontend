'use client';
import { useEffect } from 'react';

export default function GoogleStateValidator() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnedState = urlParams.get('state');
    const originalState = sessionStorage.getItem('google_oauth_state');

    if (returnedState !== originalState) {
      console.error('State inválido!');
    } else {
      console.log('State válido, pode prosseguir com login');
      sessionStorage.removeItem('google_oauth_state');
      // Aqui você poderia, por exemplo, chamar um endpoint para salvar o token ou redirecionar
    }
  }, []);

  return null; // não precisa renderizar nada
}
