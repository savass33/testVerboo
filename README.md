# Teste Técnico Verboo

## Descrição

Projeto de teste técnico para integração com a plataforma Verboo. Permite o envio de feedbacks de clientes, gerenciamento de franquias, categorias e estatísticas.

O projeto possui **backend** em Flask com banco de dados MySQL e **frontend** em Vite/React. O processo de execução foi simplificado para que seja possível rodar todo o sistema com dois cliques.

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
│   ├── venv/
│   ├── main.py
│   ├── init_db.py
│   ├── .env.example
│   └── start_backend.bat
│
├── frontend/
│   └── verbooFront/
│       ├── package.json
│       └── start_frontend.bat
└── README.md
```

---

## Instalação Inicial

### Backend

1. Abrir o terminal na pasta `backend`.
2. Criar e ativar o virtual environment (se ainda não existir):

   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Instalar dependências:

   ```powershell
   pip install -r requirements.txt
   ```
4. Criar banco de dados MySQL e tabelas:

   ```powershell
   python init_db.py
   ```
5. Configurar variáveis de ambiente:

   * Copie `.env.example` para `.env`.
   * Preencha sua senha do MySQL e outras variáveis necessárias.

### Frontend

1. Abrir o terminal na pasta `frontend\verbooFront`.
2. Instalar dependências:

   ```powershell
   npm install
   ```

---

## Como Rodar

### Opção 1: Separado

**Backend + ngrok**

```powershell
cd backend
start_backend.bat
```

Isso abrirá duas janelas: uma rodando Flask e outra o ngrok.

**Frontend**

```powershell
cd frontend\verbooFront
start_frontend.bat
```

Isso abrirá uma janela rodando o Vite.

### Opção 2: Tudo em um clique

Você pode criar um `.bat` unificado que roda **backend + ngrok + frontend**:

```bat
@echo off

REM Backend
cd /d %~dp0\backend
call venv\Scripts\activate.bat
start cmd /k "venv\Scripts\python.exe main.py"
timeout /t 2
start cmd /k "ngrok http 5000"

REM Frontend
cd /d %~dp0\frontend\verbooFront
start cmd /k "npm run dev"

pause
```

Basta clicar nesse arquivo e todo o projeto será iniciado.

---

## Observações

* **Banco de dados:** MySQL local. Crie um usuário com acesso ao banco `verboodb`.
* **Dependências:** Python (Flask, mysql-connector-python, flask-cors, python-dotenv) e Node.js (Vite/React).
* **Chave API Verboo:** Armazenar no `.env` como `VERBOO_API_KEY`.
* **Frontend opcional:** Se preferir, pode usar o link externo da plataforma Verboo em vez de rodar localmente.

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
