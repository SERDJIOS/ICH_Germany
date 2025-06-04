/**
 * src/index.js
 *
 * Утилита для построения частотного словаря букв (английский/немецкий)
 * и генерации PNG-гистограммы с помощью chartjs-node-canvas.
 *
 * Использование:
 *   node src/index.js --input <путь_к_файлу> --lang <en|de> [--output <путь_к_изображению>]
 *
 * Параметры:
 *   --input, -i   Обязательный. Путь к текстовому файлу с исходным текстом.
 *   --lang,  -l   Необязательный. 'en' или 'de'. По умолчанию 'en'.
 *   --output, -o  Необязательный. Имя выходного PNG-файла. По умолчанию 'letter_frequency_<lang>.png'.
 */

const fs = require('fs');
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const minimist = require('minimist');

// Размеры графика
const WIDTH = 1200;
const HEIGHT = 600;

/**
 * Возвращает массив букв в нижнем регистре для выбранного языка.
 * 'en' → a-z,
 * 'de' → a-z + ä, ö, ü, ß.
 *
 * @param {'en'|'de'} lang
 * @returns {string[]}
 */
function getAlphabet(lang) {
  const eng = [];
  for (let i = 0; i < 26; i++) {
    eng.push(String.fromCharCode(97 + i)); // 'a'..'z'
  }

  if (lang === 'en') {
    return eng;
  }
  if (lang === 'de') {
    // Дополняем немецкий алфавит умлаутами и ß
    return eng.concat(['ä', 'ö', 'ü', 'ß']);
  }
  throw new Error(`Unknown language code: ${lang}`);
}

/**
 * Строит частотный словарь букв для переданного текста и языка.
 *
 * @param {string} text – входной текст
 * @param {'en'|'de'} lang – код языка
 * @returns {Object<string, number>}
 */
function buildLetterFrequency(text, lang = 'en') {
  const alphabet = getAlphabet(lang);
  const lower = text.toLowerCase();

  // Инициализируем словарь
  const freq = {};
  alphabet.forEach(letter => {
    freq[letter] = 0;
  });

  // Подсчёт
  for (const char of lower) {
    if (Object.prototype.hasOwnProperty.call(freq, char)) {
      freq[char]++;
    }
  }

  return freq;
}

/**
 * Печатает словарь частот в консоль:
 * Letter | Count | Percent
 *
 * @param {Object<string, number>} freqDict
 */
function printFrequency(freqDict) {
  const letters = Object.keys(freqDict).sort();
  const total = letters.reduce((sum, l) => sum + freqDict[l], 0);

  console.log('Letter\tCount\tPercent');
  console.log('---------------------------');
  letters.forEach(letter => {
    const count = freqDict[letter];
    const pct = total > 0 ? ((count / total) * 100).toFixed(2) : '0.00';
    console.log(`${letter}\t${count}\t${pct}%`);
  });
  console.log('\nTotal letters:', total);
}

/**
 * Генерирует PNG-гистограмму частот и сохраняет её в файл.
 *
 * @param {Object<string, number>} freqDict
 * @param {string} outputFile – путь к файлу (PNG)
 * @param {'en'|'de'} lang
 */
async function plotFrequency(freqDict, outputFile, lang) {
  const letters = Object.keys(freqDict).sort();
  const counts = letters.map(letter => freqDict[letter]);

  // Создаём экземпляр ChartJSNodeCanvas
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: WIDTH,
    height: HEIGHT
  });

  // Конфигурация Chart.js
  const configuration = {
    type: 'bar',
    data: {
      labels: letters,
      datasets: [{
        label: `Letter Frequency (${lang})`,
        data: counts,
        backgroundColor: 'rgba(0, 123, 255, 0.8)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Letter Frequency Distribution (${lang.toUpperCase()})`
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Letters'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Frequency'
          },
          beginAtZero: true
        }
      }
    }
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync(outputFile, imageBuffer);
  console.log(`График сохранён в: ${outputFile}`);
}

// === Основная логика: парсим аргументы и запускаем ===

async function main() {
  // Разбираем аргументы: --input, --lang, --output
  const args = minimist(process.argv.slice(2), {
    string: ['input', 'lang', 'output'],
    alias: { i: 'input', l: 'lang', o: 'output' },
    default: { lang: 'en' }
  });

  const inputFile = args.input;
  const lang = args.lang.toLowerCase();
  let outputFile = args.output;

  if (!inputFile) {
    console.error('Ошибка: обязательно нужно указать входной файл через --input или -i');
    console.error('Пример: node src/index.js --input sample.txt --lang de --output freq_de.png');
    process.exit(1);
  }

  if (lang !== 'en' && lang !== 'de') {
    console.error('Ошибка: параметр --lang должен быть "en" или "de". По умолчанию "en".');
    process.exit(1);
  }

  // Если output не указан, формируем имя автоматически:
  if (!outputFile) {
    outputFile = `letter_frequency_${lang}.png`;
  }

  // Проверяем, что файл существует
  if (!fs.existsSync(inputFile)) {
    console.error(`Ошибка: файл "${inputFile}" не найден.`);
    process.exit(1);
  }

  // Читаем содержимое
  let text;
  try {
    text = fs.readFileSync(inputFile, 'utf8');
  } catch (err) {
    console.error('Ошибка при чтении файла:', err.message);
    process.exit(1);
  }

  // Строим частотный словарь
  const freqDict = buildLetterFrequency(text, lang);

  // Печатаем в консоль
  console.log(`Letter frequency for language="${lang}":\n`);
  printFrequency(freqDict);

  // Генерируем гистограмму и сохраняем в PNG
  await plotFrequency(freqDict, outputFile, lang);
}

main().catch(err => {
  console.error('Непредвиденная ошибка:', err);
  process.exit(1);
});