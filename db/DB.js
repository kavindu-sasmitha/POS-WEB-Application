import Item from "../model/Item.js";
import Customer from "../model/Customer.js";

export const customers = [];
export const items = [];
export const orders = [];

// Initial Data
const c1 = new Customer("C001", "John Doe", "1234567890", "123 Main St");
const c2 = new Customer("C002", "Jane Smith", "0987654321", "456 Elm St");
customers.push(c1, c2);

const i1 = new Item("I001", "Laptop", 95000.0, 15);
const i2 = new Item("I002", "Mouse", 1500.0, 50);
const i3 = new Item("I003", "Keyboard", 3200.0, 30);
items.push(i1, i2, i3);
