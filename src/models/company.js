import {Pallet} from '@/models/pallet';

export default class Company {
  constructor(name, address, phone, email, billingMail, paymentDeadline, id, pallets = [], comment = " ") {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email; 
    this.billingMail = billingMail;
    this.paymentDeadline = paymentDeadline;
    this.pallets = pallets;
    this.comment = comment;
  }


  addPallet(pallet) {
    this.pallets.push(pallet);
  }

  
  static fromJSON(json) {
    return new Company(
      json.name,
      json.address,
      json.phone,
      json.email,
      json.billingMail,
      json.paymentDeadline,
      json._id,
      json.pallets.map((pallet) => Pallet.fromJSON(pallet),
      json.comment
    )
    );
  }
}



