# Teste Técnico Verboo

## Descrição

Projeto de teste técnico para integração com a plataforma Verboo. Permite o envio de feedbacks de clientes, gerenciamento de franquias, categorias e estatísticas.

O projeto possui **backend** em Flask com banco de dados MySQL e **frontend** em Vite/React. O setup foi configurao para execução via **Docker** e ngrok, facilitando o processo de rodar o sistema em qualquer máquina.

---

## Estrutura do Projeto

```
testeVerboo/
│
├── backend/
│   ├── db/
│   │   └── connection.py
│   ├── services/
│   │   ├── feedbacks.py
│   │   ├── customers.py
│   │   ├── franchise.py
│   │   └── category.py
│   ├── main.py
│   ├── init_db.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   └── verbooFront/
│       ├── package.json
│       └── start_frontend.bat
└── README.md
```

---

## Ferramentas Necessárias

* **Docker** e **Docker Compose**
* **Node.js 18+** e **npm**
* **ngrok** (para expor o backend publicamente)
* **Editor de código** (VS Code recomendado)
* **Python 3.10+**
* **pip** (gerenciador de pacotes Python)**
* **Node.js 18+** e **npm**
* **MySQL 8+**
* **Editor de código** (VS Code recomendado)
---


## Passo a Passo de Execução

### 1. Clonar o projeto

```bash
git clone https://github.com/savass33/testVerboo.git
cd testVerboo
```

### 2. Criar arquivo `.env`

Na raiz do projeto, copie o exemplo e configure se necessário:

```bash
cp .env.example .env
```

### 3. Construir e subir containers Docker

*Observação:* Antes de construir o container, localize o arquivo `backend/entrypoint.sh` e verifique qual o padrão de quebra de linha ativo: ajuste para `LF`. Essa configuração pode ser alterada a depender da IDE utilizada, no VSCode ela esta posicionada no canto inferior direito. Altere de `CRLF` para `LF`, caso necessário.

Na raiz do projeto:

```bash
docker-compose up --build
```



Isso irá:

* Construir a imagem do backend com Python 3.11
* Rodar o MySQL
* Inicializar o banco e criar tabelas automaticamente
* Subir o backend na porta 5000

### 4. Rodar ngrok para expor o backend

```bash
ngrok http 5000
```

Copie a URL HTTPS fornecida pelo ngrok e configure na plataforma Verboo, se necessário.

### 5. Rodar frontend

```bash
cd frontend/verbooFront
npm install
npm run dev
```

O frontend será iniciado em `http://localhost:5173` (ou porta que o Vite indicar).

### 6. Acessar e testar

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`
* URL pública via ngrok: usar na Verboo para envio de feedbacks

---

## Observações

* **Banco de dados:** MySQL interno do container. O script `init_db.py` já inicializa as tabelas.
* **Dependências:** Python (Flask, mysql-connector-python, flask-cors, python-dotenv) e Node.js (Vite/React).
* **Link da IA:** `https://rita.verbeux.com.br/generative/c30be119-2c91-427d-beff-32cad93ccdbd`

---

## Estrutura das Tabelas MySQL

### `customers`

* `id` INT PK AI
* `name` VARCHAR(50)
* `city` VARCHAR(50)
* `state` VARCHAR(50)
* `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP

### `franchise`

* `id` INT PK AI
* `name` VARCHAR(50)
* `city` VARCHAR(50)
* `state` VARCHAR(50)
* `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP

### `category`

* `id` INT PK AI
* `kind` ENUM('complaint','compliment') DEFAULT 'compliment'

### `feedbacks`

* `id` INT PK AI
* `customer_id` INT FK customers(id)
* `franchise_id` INT FK franchise(id)
* `category_id` INT FK category(id)
* `message_text` TEXT
* `notes` TEXT
* `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP


