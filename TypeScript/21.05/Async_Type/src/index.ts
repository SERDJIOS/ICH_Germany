// «длинная» операция, результат которой случаен
const delayPromise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
  
      if (success) {
        resolve('✅ Успех! Всё прошло нормально');
      } else {
        reject(new Error('❌ Ой, что-то пошло не так'));
      }
    }, 1_000); // 1 секунда задержки
  });
  
  delayPromise
    .then(result => {
      console.log('then →', result);
    })
    .catch(err => {
      console.error('catch →', err.message);
    })
    .finally(() => {
      console.log('finally → завершаем: можно чистить ресурсы, скрывать лоадер и т.д.');
    });