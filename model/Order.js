export default class Order {
  constructor(order_id, customer_id, item_code, quantity, total_price) {
    this._order_id = order_id;
    this._customer_id = customer_id;
    this._item_code = item_code;
    this._quantity = quantity;
    this._total_price = total_price;
  }

  get order_id() {
    return this._order_id;
  }
  get customer_id() {
    return this._customer_id;
  }
  get item_code() {
    return this._item_code;
  }
  get quantity() {
    return this._quantity;
  }
  get total_price() {
    return this._total_price;
  }
}
