import { customers, items, orders } from "../db/DB.js";
import Order from "../model/Order.js";

const customerSelect = $("#orderCustomerId");
const itemSelect = $("#orderItemCode");
const qtyInput = $("#orderItemQty");
const totalDisplay = $("#orderTotalDisplay");

function generateOrderId() {
  return orders.length === 0
    ? "O001"
    : "O" + String(orders.length + 1).padStart(3, "0");
}

function refreshCustomerDropdown() {
  customerSelect
    .empty()
    .append('<option value="" disabled selected>Select customer</option>');
  customers.forEach((c) => {
    customerSelect.append(
      `<option value="${c.id}">${c.name} (${c.id})</option>`
    );
  });
}

function refreshItemDropdown() {
  itemSelect
    .empty()
    .append('<option value="" disabled selected>Select item</option>');
  items.forEach((item) => {
    itemSelect.append(
      `<option value="${item.item_code}">
        ${item.name} - $${item.price.toFixed(2)} (Stock: ${item.qty})
      </option>`
    );
  });
}

function calculateTotal() {
  const code = itemSelect.val();
  const qty = parseInt(qtyInput.val()) || 0;
  const item = items.find((i) => i.item_code === code);
  totalDisplay.val(item && qty > 0 ? (item.price * qty).toFixed(2) : "0.00");
}

$("#placeOrderForm").on("submit", function (e) {
  e.preventDefault();
  const custId = customerSelect.val();
  const itemCode = itemSelect.val();
  const qty = parseInt(qtyInput.val());

  if (!custId || !itemCode || qty < 1) {
    alert("Please fill all fields correctly.");
    return;
  }

  const item = items.find((i) => i.item_code === itemCode);
  if (item.qty < qty) {
    alert(`Only ${item.qty} in stock!`);
    return;
  }

  item.qty -= qty;
  const total = item.price * qty;
  const order = new Order(generateOrderId(), custId, itemCode, qty, total);
  orders.push(order);

  alert(`Order ${order.order_id} placed! Total: $${total.toFixed(2)}`);
  this.reset();
  totalDisplay.val("0.00");
  loadOrderTable();
  refreshItemDropdown();
});

itemSelect.on("change", calculateTotal);
qtyInput.on("input", calculateTotal);

function loadOrderTable() {
  $("#orderTableBody").empty();
  orders.forEach((o) => {
    const item = items.find((i) => i.item_code === o.item_code);
    const cust = customers.find((c) => c.id === o.customer_id);
    $("#orderTableBody").append(
      `<tr>
        <td>${o.order_id}</td>
        <td>${cust?.name || "-"}</td>
        <td>${item?.name || "-"}</td>
        <td>${o.quantity}</td>
        <td>${item?.price.toFixed(2) || "-"}</td>
        <td>${o.total_price.toFixed(2)}</td>
      </tr>`
    );
  });
}

$("#addCustomerModal, #addItemModal").on("hidden.bs.modal", () => {
  refreshCustomerDropdown();
  refreshItemDropdown();
});

$(document).ready(() => {
  refreshCustomerDropdown();
  refreshItemDropdown();
  loadOrderTable();
});
