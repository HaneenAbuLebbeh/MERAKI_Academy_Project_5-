-- Create a table called **roles** in the database
CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **permissions** in the database
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **role_permission** in the database
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);

-- Create a table called **users** in the database
CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
  country VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);

-- Create a table called **Country_Categories** in the database
CREATE TABLE Country_Categories(
id SERIAL PRIMARY KEY,
category_name VARCHAR(255) NOT NULL,
description TEXT,
image_url VARCHAR(255)
); 


-- Create a table called **TouristSpots** in the database
CREATE TABLE TouristSpots (
id SERIAL PRIMARY KEY,
category_id INTEGER NOT NULL,
spot_name VARCHAR(255) NOT NULL,
description TEXT,
image_url TEXT,
virtual_tour_url VARCHAR(255),
FOREIGN KEY (category_id) REFERENCES Country_Categories(id) ON DELETE CASCADE
); 


-- Create a table called **products** in the database
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
price DECIMAL(10, 2) NOT NULL,
category_id INTEGER,  
spot_id INTEGER,
image TEXT NOT NULL,
rating DECIMAL(2, 1) NOT NULL,
extra  VARCHAR(50) NOT NULL,
FOREIGN KEY (category_id) REFERENCES Country_Categories(id),
FOREIGN KEY (spot_id) REFERENCES TouristSpots(id)
);


-- Create a table called **orders** in the database
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
total_amount DECIMAL(10, 2) NOT NULL,
payment_method VARCHAR(50) CHECK (payment_method IN ('paypal', 'Credit Card', 'Cash')) NOT NULL,
is_paid BOOLEAN DEFAULT FALSE,
paid_at TIMESTAMP,
is_delivered BOOLEAN DEFAULT FALSE,
delivered_at TIMESTAMP,
note TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
full_address TEXT NOT NULL,
street VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
state VARCHAR(255) NOT NULL,
country VARCHAR(255) NOT NULL,
latitude DECIMAL(9, 6) NOT NULL,
longitude DECIMAL(9, 6) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create a table called **order_items ** in the database
CREATE TABLE order_items (
id SERIAL PRIMARY KEY,
order_id INTEGER NOT NULL,
product_id INTEGER NOT NULL,
quantity INTEGER NOT NULL,
price DECIMAL(10, 2) NOT NULL,
FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create a table called **carts ** in the database
CREATE TABLE carts (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create a table called **cart_items ** in the database
CREATE TABLE cart_items (
id SERIAL PRIMARY KEY,
cart_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL DEFAULT 1,
price DECIMAL(10, 2) NOT NULL,
FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);



-- create roles and permessions 
INSERT INTO
  roles (role)
VALUES
  ('Admin');

INSERT INTO
  permissions (permission)
VALUES
  ('CREATE_ARTICLE');

INSERT INTO
  permissions (permission)
VALUES
  ('CREATE_COMMENT');

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 1);

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 2);