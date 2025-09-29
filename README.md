# Teste Técnico Verboo

## Descrição

Projeto de teste técnico para integração com a plataforma **Verboo**.
Permite o envio de feedbacks de clientes, gerenciamento de franquias,
categorias e estatísticas.

O projeto possui **backend** em Flask com banco de dados MySQL e
**frontend** em Vite/React. O setup foi configurado para execução via
**Docker** e **ngrok**, garantindo portabilidade e facilidade de
execução.

⚡ **Link da IA (essencial para integração):** 👉 [Acessar
IA](https://rita.verbeux.com.br/generative/c30be119-2c91-427d-beff-32cad93ccdbd)

------------------------------------------------------------------------

## Estrutura do Projeto

    testeVerboo/
    │
    ├── backend/
    │   ├── db/
    │   │   ├── (arquivos do banco, ex: connection.py)
    │   ├── services/
    │   │   ├── categories.py
    │   │   ├── customers.py
    │   │   ├── feedbacks.py
    │   │   ├── franchise.py
    │   │   └── stats.py
    │   ├── entrypoint.sh
    │   ├── init_db.py
    │   ├── main.py
    │   ├── wait_for_db.py
    │   ├── Dockerfile
    │   ├── requirements.txt
    │   └── .gitignore
    │
    ├── frontend/verbooFront/
    │   ├── node_modules/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   │   ├── Dashboard.tsx
    │   │   │   ├── DashboardToggle.tsx
    │   │   │   ├── FeedbackCharts.tsx
    │   │   │   ├── FeedbackList.tsx
    │   │   │   └── StatsCards.tsx
    │   │   ├── services/
    │   │   ├── App.tsx
    │   │   ├── App.css
    │   │   ├── index.css
    │   │   └── main.tsx
    │   ├── Dockerfile
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── tsconfig.json
    │   ├── tsconfig.app.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

## Ferramentas Necessárias

-   **Docker** e **Docker Compose**
-   **Node.js 18+** e **npm**
-   **ngrok** (para expor o backend publicamente)
-   **Editor de código** (VS Code recomendado)
-   **Python 3.10+**
-   **pip** (gerenciador de pacotes Python)
-   **MySQL 8+**

------------------------------------------------------------------------

## Passo a Passo de Execução

### 1. Clonar o projeto

``` bash
git clone https://github.com/savass33/testVerboo.git
cd testVerboo
```

### 2. Criar arquivo `.env`

Na raiz do projeto, copie o exemplo e configure se necessário:

``` bash
cp .env.example .env
```

### 3. Construir e subir containers Docker

⚠️ **Atenção:** antes de rodar essa próxima linha de código se atente a 3 coisas:

1. Ajuste o arquivo `backend/entrypoint.sh` para utilizar **LF** como quebra de linha.\
No VS Code, isso é configurado no canto inferior direito (alterar de
`CRLF` para `LF`).

2. Cerfitique que suas configurações no .env foram atualizada de acordo com suas informações do MySQL

3. Que o Docker esteja rodando corretamente e já esteja aberto

Na raiz do projeto:

``` bash
docker-compose up --build
```

Isso irá: \* Construir a imagem do backend com Python 3.11 \* Rodar o
MySQL \* Inicializar o banco e criar tabelas automaticamente \* Subir o
backend na porta 5000

### 4. Rodar ngrok para se conectar com o Assistente Verboo

Lembre-se de configurar o ngrok caso seja a primeira vez que esteja utilizando.

``` bash
ngrok http 5000
```

### 5. Rodar frontend

``` bash
cd frontend/verbooFront
npm install
npm run dev
```

O frontend será iniciado em `http://localhost:5173` (ou porta que o Vite
indicar).

### 6. Acessar e testar

-   Frontend: `http://localhost:5173`
-   Backend: `http://localhost:5000`
-   URL pública via ngrok: usar na Verboo para envio de feedbacks
-   **IA:** [Acessar
    aqui](https://rita.verbeux.com.br/generative/c30be119-2c91-427d-beff-32cad93ccdbd)

------------------------------------------------------------------------

## Observações

-   **Banco de dados:** MySQL interno do container. O script
    `init_db.py` já inicializa as tabelas.
-   **Dependências:** Python (Flask, mysql-connector-python, flask-cors,
    python-dotenv) e Node.js (Vite/React).

------------------------------------------------------------------------

## Estrutura das Tabelas MySQL

### `customers`

-   `id` INT PK AI
-   `name` VARCHAR(50)
-   `city` VARCHAR(50)
-   `state` VARCHAR(50)
-   `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP

### `franchise`

-   `id` INT PK AI
-   `name` VARCHAR(50)
-   `city` VARCHAR(50)
-   `state` VARCHAR(50)
-   `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP

### `category`

-   `id` INT PK AI
-   `kind` ENUM('complaint','compliment') DEFAULT 'compliment'

### `feedbacks`

-   `id` INT PK AI
-   `customer_id` INT FK customers(id)
-   `franchise_id` INT FK franchise(id)
-   `category_id` INT FK category(id)
-   `message_text` TEXT
-   `notes` TEXT
-   `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP

