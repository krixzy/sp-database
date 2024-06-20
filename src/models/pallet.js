export class Pallet {
  constructor(name, price, size, itemNumber, comment, coToo, id, palletComponentes = "") {
    this.id = id;
    this.name = name;
    this.price = price;
    this.size = size;
    this.itemNumber = itemNumber;
    this.comment = comment;
    this.coToo = coToo;
    this.palletComponentes = palletComponentes;
  }

  static fromJSON(json) {
    return new Pallet(
      json.name,
      json.price,
      json.size,
      json.itemNumber,
      json.comment,
      json.coToo,
      json.id == undefined ? this.generateID() : json.id
    );
  }
  static generateID = () => {
  return Math.random().toString(36).substr(2, 9);
}
}

