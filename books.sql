DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255)
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'Catch-22',
  'Joseph Heller',
  '9780684865133',
  'http://books.google.com/books/content?id=Xfze51E7TEoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Presents the contemporary classic depicting the struggles of a U.S. airman attempting to survive the lunacy and depravity of a World War II base',
  'none'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
 'Dune',
  'Frank Herbert', 
  '9780441013593',
  'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
 'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.',
 'none'
  );