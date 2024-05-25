export class Company {
  constructor(name, address, phone, email, billingMail) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email; 
    this.billingMail = billingMail;
    this.pallets = [];
  }
}