import 'dotenv/config';
import fs from 'fs';

const filename = process.env.FILENAME;
const content = 'Привет! не ушто получилось...';


fs.writeFileSync(filename, content, 'utf8');


const fileContent = fs.readFileSync(filename, 'utf8');

console.log('Содержимое файла:', fileContent);
