const Ticket = require('../models/Ticket.model');


const createTicketController = (req, res, next) => {
  
  console.log(req.body);
  
  Ticket.create({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    createdAt: req.body.createdAt,
    status: req.body.status,
    messages: req.body.messages

  })
    .then(createdTicket => {
      res.send(createdTicket);
    })
    .catch(err => res.send(err));

};

const listTicketsController = (req, res, next) => {

  Ticket.find()
    .then(foundTicketsArray => {
      res.send(foundTicketsArray)
    })
    .catch(err => res.send(err));

};

const listTicketByIdController = (req, res, next) => {

  Ticket.findById(req.params.ticketId)
    .populate('tickets')
    .then(foundTicket => {
      res.send(foundTicket)
    })
    .catch(err => res.send(err));
    
};

const updateTicketByIdController = (req, res, next) => {

  Ticket.findByIdAndUpdate(req.params.ticketId, {
    status: req.body.status
  }, { new: true })
    .then(updatedTicket => {
      res.send(updatedTicket);
    })
    .catch(err => res.send(err));

};

const deleteTicketByIdController = (req, res, next) => {

  Ticket.findByIdAndDelete(req.params.ticketId)
    .then(deletedTicket => {
      res.send(deletedTicket);
    })
    .catch(err => res.send(err));

}
module.exports = {
  createTicketController,
  listTicketsController,
  listTicketByIdController,
  updateTicketByIdController,
  deleteTicketByIdController
};