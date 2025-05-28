class Stack:
    def __init__(self):
        """Инициализация пустого стека."""
        self.items = []
    
    def empty(self) -> bool:
        """Проверка стека на пустоту.
        
        Возвращает:
            bool: True если стек пустой, False если нет
        """
        return len(self.items) == 0
    
    def push(self, item):
        """Добавление нового элемента в стек.
        
        Аргументы:
            item: Элемент для добавления в стек
        """
        self.items.append(item)
    
    def pop(self):
        """Удаление и возврат верхнего элемента стека.
        
        Возвращает:
            Верхний элемент стека
            
        Вызывает:
            IndexError: Если стек пустой
        """
        if self.empty():
            raise IndexError("Невозможно удалить элемент из пустого стека")
        return self.items.pop()
    
    def peek(self):
        """Возвращает верхний элемент стека без его удаления.
        
        Возвращает:
            Верхний элемент стека
            
        Вызывает:
            IndexError: Если стек пустой
        """
        if self.empty():
            raise IndexError("Невозможно просмотреть элемент пустого стека")
        return self.items[-1]
    
    def search(self, element) -> int:
        """Поиск элемента в стеке и возврат его позиции с вершины.
        
        Аргументы:
            element: Искомый элемент
            
        Возвращает:
            int: Позиция от вершины (0-based) если найден, -1 если не найден
        """
        for i in range(len(self.items) - 1, -1, -1):
            if self.items[i] == element:
                return len(self.items) - 1 - i
        return -1 