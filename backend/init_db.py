from db.connection import create_connection

# Conectar ao banco
conn = create_connection()
if not conn:
    exit("Não foi possível conectar ao banco de dados.")

cursor = conn.cursor()

# Criar banco se não existir
cursor.execute("CREATE DATABASE IF NOT EXISTS verboodb")
cursor.execute("USE verboodb")

# Criar tabela customers
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
"""
)

# Criar tabela franchise
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS franchise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
"""
)

# Criar tabela category
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kind ENUM('complaint','compliment') NOT NULL DEFAULT 'compliment'
)
"""
)

# Inserir categorias iniciais
cursor.executemany(
    "INSERT IGNORE INTO category (kind) VALUES (%s)", [("complaint",), ("compliment",)]
)

# Criar tabela feedbacks
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS feedbacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    franchise_id INT,
    category_id INT,
    message_text TEXT NOT NULL,
    notes TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (franchise_id) REFERENCES franchise(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
)
"""
)

conn.commit()
cursor.close()
conn.close()
print("Banco de dados e tabelas inicializados com sucesso!")
