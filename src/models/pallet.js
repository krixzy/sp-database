import PalletComponentes from "./palletComponentes";

export class Pallet {
  constructor(name, price, size, itemNumber, comment, coToo, id, palletComponentes = new PalletComponentes() ) {
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
      json.id == undefined ? this.generateID() : json.id,
      json.palletComponentes == undefined || json.palletComponentes == "" ? new PalletComponentes() : PalletComponentes.fromJSON(json.palletComponentes)
    );
  }
  static generateID = () => {
  return Math.random().toString(36).substr(2, 9);
}
}

