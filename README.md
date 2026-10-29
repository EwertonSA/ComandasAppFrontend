# ComandasApp Frontend

Frontend do sistema de pedidos e gestão de restaurantes da plataforma ComandasApp. A aplicação foi desenvolvida em Next.js com React e TypeScript e oferece duas experiências principais:

- cliente/consumidor: navega pelo cardápio, seleciona itens, acompanha a comanda e realiza o pedido sem autenticação
- colaborador: acessa o painel interno para gerenciar produtos, pedidos, pagamentos e atendimento do restaurante

## Visão geral

Este projeto é o frontend de um sistema para restaurantes que centraliza o atendimento digital, permitindo:

- visualização do cardápio por categoria
- criação e acompanhamento de pedidos
- pagamento e fechamento de pedidos
- gerenciamento de produtos e fluxo operacional
- experiência mobile-first com suporte a empacotamento via Capacitor

## Stack utilizada

- Next.js 15
- React 19
- TypeScript
- Bootstrap 5
- Sass
- Axios
- SWR
- FontAwesome
- Capacitor

## Estrutura principal

```text
app/
├── employeeApp/          # painel interno do restaurante
├── homeNoAuth/           # fluxo do cliente sem autenticação
├── login/                # autenticação
├── portfolio/            # landing page / apresentação do projeto
├── layout.tsx            # layout global
├── page.tsx              # rota inicial
src/
├── components/
├── services/
├── types/
styles/
├── globals.scss
public/
android/
capacitor.config.ts
next.config.ts
package.json
```

## Funcionalidades

- cardápio por categorias (bebidas, entradas, pratos, sobremesas)
- seleção de itens por comanda
- fluxo de pedidos para clientes
- painel de colaboradores para atendimento
- gestão de pagamentos
- visualização de produtos e categorias
- interface responsiva para desktop e mobile

## Requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Executando localmente

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Build de produção

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Observações

- O projeto foi estruturado para funcionar como frontend de um ambiente de restaurante com fluxo de pedido digital.
- Há suporte para execução em dispositivos móveis por meio do Capacitor, com configuração na pasta `android/`.
- O projeto usa as rotas App Router do Next.js (`app/`).

## Licença

Este projeto não possui uma licença definida no repositório.
