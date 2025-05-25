
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  return price * quantity * (1 - discount);
}


const total = calculateTotal(10, 5, 0.2); 
console.log(total);


type IdType = string | number;

function displayId(id: IdType): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id * 10);
  }
}


const stringId: IdType = "abc123";
const numberId: IdType = 42;
displayId(stringId); // ABC123
displayId(numberId); // 420


type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: "ORD001", amount: 100, status: "pending" },
  { orderId: "ORD002", amount: 150, status: "shipped" },
  { orderId: "ORD003", amount: 200, status: "delivered" },
  { orderId: "ORD004", amount: 120, status: "pending" }
];

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[] {
  return orders.filter(order => order.status === status);
}


const pendingOrders = filterOrdersByStatus(orders, "pending");
console.log(pendingOrders);


type ProductInfo = [string, number, number]; 

function updateStock(inventory: Record<string, number>, productInfo: ProductInfo): Record<string, number> {
  const [productName, _, quantity] = productInfo;
  inventory[productName] = quantity;
  return inventory;
}


const inventory: Record<string, number> = {
  "Laptop": 10,
  "Phone": 20,
  "Tablet": 15
};

const laptopInfo: ProductInfo = ["Laptop", 1200, 5];
const updatedInventory = updateStock(inventory, laptopInfo);
console.log(updatedInventory); 