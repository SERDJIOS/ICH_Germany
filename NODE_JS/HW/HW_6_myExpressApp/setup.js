// setup.js
import {db} from './src/db.js';


try {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
  `);
  console.log('Table created successfully!');
  process.exit();
} catch (err) {
  console.error('Error creating table:', err);
  process.exit(1);
}
