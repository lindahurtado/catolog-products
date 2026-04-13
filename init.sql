CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    url VARCHAR(255),
    state BOOLEAN DEFAULT true
);

INSERT INTO products (name, description, price, url, state) VALUES
('Curso React', 'Aprende desde cero', 199000, 'http://www.examplereact.com', true);