export default class Item {
  constructor(item_code, name, price, qty) {
    this._item_code = item_code;
    this._name = name;
    this._price = price;
    this._qty = qty;
  }

  get item_code() {
    return this._item_code;
  }
  set item_code(v) {
    this._item_code = v;
  }
  get name() {
    return this._name;
  }
  set name(v) {
    this._name = v;
  }
  get price() {
    return this._price;
  }
  set price(v) {
    this._price = v;
  }
  get qty() {
    return this._qty;
  }
  set qty(v) {
    this._qty = v;
  }
}
