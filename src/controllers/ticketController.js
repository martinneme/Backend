import { saveTicket,findTicketByID } from "../service/ticketService.js";

const purchase =  async (req, res) => {
    const purchase = await findTicketByID()
    res.render('purchaseView')
  
 }

 export {
    purchase
 }