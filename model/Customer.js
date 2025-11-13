export default class Customer {
  constructor(id, name, contact, address) {
    this._id = id;
    this._name = name;
    this._contact = contact;
    this._address = address;
  }

  get id() {
    return this._id;
  }
  set id(v) {
    this._id = v;
  }
  get name() {
    return this._name;
  }
  set name(v) {
    this._name = v;
  }
  get contact() {
    return this._contact;
  }
  set contact(v) {
    this._contact = v;
  }
  get address() {
    return this._address;
  }
  set address(v) {
    this._address = v;
  }
}
