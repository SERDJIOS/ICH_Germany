
// Рекурсивная реализация (классическая)
function quickSortRecursive(arr) {
  // Базовый случай: массивы длиной 0 или 1 уже отсортированы
  if (arr.length <= 1) {
    return arr;
  }

  // Выбираем опорный элемент (обычно средний)
  const pivot = arr[Math.floor(arr.length / 2)];
  
  // Разделяем массив на три части
  const less = [];
  const equal = [];
  const greater = [];
  
  for (const element of arr) {
    if (element < pivot) {
      less.push(element);
    } else if (element > pivot) {
      greater.push(element);
    } else {
      equal.push(element);
    }
  }
  
  // Рекурсивно сортируем подмассивы и объединяем результаты
  return [...quickSortRecursive(less), ...equal, ...quickSortRecursive(greater)];
}


// Итерационная реализация (с использованием стека)
function quickSortIterative(arr) {
  // Создаем стек для хранения границ подмассивов
  const stack = [];
  // Начальные границы всего массива
  stack.push(0);
  stack.push(arr.length - 1);
  
  while (stack.length > 0) {
    // Извлекаем правую и левую границы
    const high = stack.pop();
    const low = stack.pop();
    
    if (low >= high) {
      continue; // Подмассив уже отсортирован
    }
    
    // Выбираем опорный элемент (последний элемент)
    const pivot = arr[high];
    let i = low - 1;
    
    // Разделение массива
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Меняем местами
      }
    }
    
    // Помещаем опорный элемент на правильную позицию
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    const pivotIndex = i + 1;
    
    // Добавляем границы новых подмассивов в стек
    stack.push(low);
    stack.push(pivotIndex - 1); // Левая часть
    
    stack.push(pivotIndex + 1);
    stack.push(high); // Правая часть
  }
  
  return arr;
}


const array = [9, 7, 5, 11, 12, 2, 14, 3, 10, 6];

console.log("Рекурсивная версия:", quickSortRecursive(array.slice()));
console.log("Итерационная версия:", quickSortIterative(array.slice()));