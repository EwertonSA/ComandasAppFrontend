# Etapa 1: build
FROM node:20-bullseye AS build

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Variável para build
ARG NEXT_PUBLIC_BASEURL
ENV NEXT_PUBLIC_BASEURL=$NEXT_PUBLIC_BASEURL

# Build da aplicação SSR
RUN npm run build

# Etapa 2: runtime
FROM node:20-bullseye

WORKDIR /app

# Copia apenas node_modules e build para runtime
COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Variável disponível no runtime SSR
ENV NEXT_PUBLIC_BASEURL=$NEXT_PUBLIC_BASEURL

EXPOSE 3000

# Start SSR
CMD ["npm", "start"]