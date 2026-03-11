export default async function redirectToLinkedinLogin() {
  try {
    const response = await fetch('http://localhost:3001/api/auth/linkedin/callback/',{  // rota do backend que gera URL + state
      credentials: 'include'})
    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;  // redireciona para LinkedIn com state gerado no backend
    } else {
      console.error('URL do LinkedIn não retornada pelo backend');
    }
  } catch (error) {
    console.error('Erro ao buscar URL do LinkedIn', error);
  }
}
