-- Create Users table
CREATE TABLE Users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_name VARCHAR(50) NOT NULL UNIQUE,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
   is_writer BOOLEAN DEFAULT FALSE,
   is_admin BOOLEAN DEFAULT FALSE
);

-- Create Articles table
CREATE TABLE Articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  writer_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (writer_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Comments table
CREATE TABLE Comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      article_id INT NOT NULL,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE
);

-- Create Likes table
CREATE TABLE Likes (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   article_id INT NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
   FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE,
   UNIQUE KEY unique_like (user_id, article_id)
);

-- Insert a default admin user
INSERT INTO Users (user_name, first_name, last_name, email, password, is_writer, is_admin)
VALUES ('admin', 'Admin', 'User', 'admin@example.com', 'hashed_password_here', TRUE, TRUE);
