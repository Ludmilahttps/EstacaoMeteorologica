# Back-and da Estação Meteorológica UFSC-Araranguá

Este projeto foi desenvolvido durante a disciplina de Projeto Integrador 1 do curso de Engenharia de Computação da UFSC Araranguá no semestre de 2024.1. 

## Participantes

- Augusto Daleffe
- Ludmila Silveira
- Débora Castro
- Eduardo Swarowsky
- Vinicius Muchulski

## Descrição Geral

O objetivo deste projeto como um todo é desenvolver uma estação meteorológica utilizando quatro sensores: Anemômetro, Pluviómetro, DHT11 e BMP280. Estes sensores coletam dados como temperatura, umidade, quantidade de chuva, velocidade e direção do vento. Os dados são enviados por meio de um ESP32 para um banco de dados na nuvem. Onde os dados serão tratados adequadamente e poderão ser vizualizados e analizados através de uma aplicaçã web.

## Descrição Específica

A equipe de software composta por Augusto Daleffe e Ludmilla Silveira. Ficou responsável pelo desenvolvimento completo da aplicação web mensionada anteriormente. Neste presente repositório será encontrada toda o back-and de tal aplicação.
O objetivo dessa parte do desenvolvimento era primeiramente desenvolver um banco de dados robusto o suficie para comportar todos os dados que irão ser recebidos das estações de coleta, e garantir a segurança dos mesmos. 
Considerando isso, foi desenvolvido todo um sistema de controle de acesso a interface web, onde existe um usuário master e somente ele pode cadastras novos usuários, garantindo acesso restrito a tal análise.
No presente repositório vai ser encontrado desde a lógica da criação das tabelas no banco de dados, até a lógica de segurança das requisições. 

## Funcionalidades

A aplicação web possui as seguintes funcionalidades:

- Login e cadastro de usuários
- Análise de dados meteorológicos
- Envio de dados extras ao banco ( não coletados pelo sistema do esp32)
- Adição de novas estações (mesmos sensores porém em diferentes localidades)
- Controle de acesso baseado na posição do usuário (Admin, Aluno, Professor)

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Express.js
- PostgreSQL

## Organização dos Diretórios

- `docs/`: Contém documentos como modelagem do banco de dados e diagramas de caso de uso.
- `src/`: Contém todos os queries, controllers, middlewares, routes e schemas do backend. Além do arquivo `server.js`.
- `tables.sql`: Contém as tabelas do banco de dados.
- `vercel.json`: Utilizado para hospedar o backend e o banco de dados gratuitamente na Vercel.
- `package.json`: Contém as dependências e scripts do projeto.
- `package-lock.json`: Contém o bloqueio das versões das dependências instaladas.

### Organização do Diretório `src/`

- `queries/`: Contém os arquivos que definem as consultas ao banco de dados.
  - `sensorQueries.js`: Consultas relacionadas aos dados dos sensores.
  - `userQueries.js`: Consultas relacionadas aos dados dos usuários.
  
- `controllers/`: Contém os arquivos que controlam a lógica da aplicação.
  - `sensorController.js`: Controla a lógica de leitura e gravação dos dados dos sensores.
  - `userController.js`: Controla a lógica de autenticação e gerenciamento de usuários.
  
- `middlewares/`: Contém os middlewares utilizados na aplicação.
  - `authMiddleware.js`: Middleware para verificação de autenticação de usuários.
  - `errorMiddleware.js`: Middleware para tratamento de erros na aplicação.
  
- `routes/`: Contém as definições das rotas da aplicação.
  - `sensorRoutes.js`: Define as rotas relacionadas aos sensores.
  - `userRoutes.js`: Define as rotas relacionadas aos usuários.
  
- `schemas/`: Contém os esquemas de validação de dados.
  - `sensorSchema.js`: Valida os dados dos sensores antes de serem processados.
  - `userSchema.js`: Valida os dados dos usuários antes de serem processados.
  
- `server.js`: Arquivo principal que configura e inicia o servidor Express.

## Como Usar

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- PostgreSQL instalado e configurado

### Instalação

1. **Clone o repositório:**
   
   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio

2. **Instale as dependências:**

   ```bash
   npm install

3. **Configure o banco de dados:**

Crie um banco de dados PostgreSQL e configure as tabelas executando o arquivo `tables.sql`

   ```bash
   psql -U seu_usuario -d seu_banco_de_dados -f tables.sql
   


4. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do seu projeto e use o `.env.example` como inspiração

### Execução

1. **Inicie o servidor:**

   ```bash
   npm start

2. **Acesse a  aplicação:**

A aplicação estará disponível em `http://localhost:3000`.


