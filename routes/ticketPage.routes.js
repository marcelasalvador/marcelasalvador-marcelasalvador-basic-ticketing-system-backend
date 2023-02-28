const express = require("express")
const router = express.Router()
const {
    createTicketController,
    listTicketsController,
    listTicketByIdController,
    updateTicketByIdController,
    deleteTicketByIdController
  } = require("../controllers/ticket.controllers")


router.post("/", createTicketController)
router.get("/", listTicketsController);
router.get ("/:ticketId", listTicketByIdController);
router.put("/:ticketId", updateTicketByIdController)
router.delete("/:ticketId", deleteTicketByIdController)


module.exports = router

