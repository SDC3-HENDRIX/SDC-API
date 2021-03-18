DROP DATABASE IF EXISTS products; /* I may remove this I didn't come here to be judged*/

CREATE DATABASE IF NOT EXISTS products;

USE products;

GRANT ALL ON products.* to student@localhost;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128),
  slogan TEXT,
  description TEXT,
  category VARCHAR(64),
  default_price INT
);

CREATE TABLE IF NOT EXISTS features (
  feature_id INT AUTO_INCREMENT PRIMARY KEY,
  feature VARCHAR(64),
  value VARCHAR(64),
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS styles (
  style_id INT  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128),
  original_price INT,
  sale_price INT,
  default_style BOOLEAN,
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS skus (
  sku_id INT AUTO_INCREMENT PRIMARY KEY,
  quantity INT,
  size VARCHAR(16),
  style_id INT,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INT  AUTO_INCREMENT PRIMARY KEY,
  thumbnail_url TEXT,
  url TEXT,
  style_id INT,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS related (
  related_id INT AUTO_INCREMENT PRIMARY KEY,
  related_product_id INT,
  current_product_id INT,
  FOREIGN KEY (current_product_id) REFERENCES products(product_id)
);
