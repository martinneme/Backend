

export default class TicketDTO {
    constructor(purchase, productsAccepted, productsRejected) {
      this.purchase = purchase;
      this.productsAccepted = productsAccepted;
      this.productsRejected = productsRejected;
    }
  }