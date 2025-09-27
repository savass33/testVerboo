# Teste Técnico Verboo

## Descrição

Projeto de teste técnico para integração com a plataforma Verboo. Permite o envio de feedbacks de clientes, gerenciamento de franquias, categorias e estatísticas.

O projeto possui **backend** em Flask com banco de dados MySQL e **frontend** em Vite/React. Todo o processo de execução foi simplificado para que o avaliador consiga rodar o sistema facilmente.

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
│   ├── requirements.txt
│   └── start_backend.bat
│
├── frontend/
│   └── verbooFront/
│       ├── package.json
│       └── start_frontend.bat
└── README.md
```

---

## Ferramentas Necessárias

* **Python 3.10+**
* **pip** (gerenciador de pacotes Python)
* **Node.js 18+** e **npm**
* **MySQL 8+** ou MariaDB
* **ngrok** (opcional, para expor o backend publicamente)
* **Editor de código** (VS Code recomendado)

---

## Backend

### Instalação Inicial

1. Abrir o terminal na pasta `backend`.
2. Criar o virtual environment:

   ```powershell
   python -m venv venv
   ```
3. Ativar o virtual environment:

   ```powershell
   .\venv\Scripts\activate
   ```
4. Instalar as dependências do Python:

   ```powershell
   pip install -r requirements.txt
   ```
5. Criar o banco de dados MySQL (`verboodb`) e tabelas:

   ```powershell
   python init_db.py
   ```
6. Configurar variáveis de ambiente:

   * Copie `.env.example` para `.env`
   * Preencha os valores: senha do MySQL, host, usuário e VERBOO_API_KEY.

### Como Rodar

* Clique duas vezes em `start_backend.bat` ou rode no terminal:

```powershell
cd backend
start_backend.bat
```

* Isso abrirá duas janelas: uma rodando o Flask e outra rodando o ngrok.

---

## Frontend

### Instalação Inicial

1. Abrir terminal na pasta `frontend\verbooFront`.
2. Instalar dependências do Node:

```powershell
npm install
```

### Como Rodar

* Clique duas vezes em `start_frontend.bat` ou rode no terminal:

```powershell
cd frontend\verbooFront
start_frontend.bat
```

* Uma janela de terminal será aberta mostrando o endereço do Vite (`http://localhost:5173`) que pode ser aberto no navegador.

> **Observação:** Se preferir, é possível usar o link externo do Verboo para abrir a IA sem rodar o frontend local.

---

## Executando Tudo em Um Clique

Existe um `.bat` unificado para rodar **backend + ngrok + frontend**:

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

* Basta clicar nele para abrir todas as janelas necessárias.

---

## Observações

* **Banco de dados:** MySQL local. Crie um usuário com acesso ao banco `verboodb`.
* **Dependências:** Python (Flask, mysql-connector-python, flask-cors, python-dotenv) e Node.js (Vite/React).
* **Link da IA Verboo:** `https://rita.verbeux.com.br/generative/c30be119-2c91-427d-beff-32cad93ccdbd`

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
