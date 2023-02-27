const express = require("express")
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware")
const {
    createTicketController,
    listTicketsController,
    listTicketByIdController,
    updateTicketByIdController,
    deleteTicketByIdController
  } = require("../controllers/ticket.controllers")

const router = express.Router()

////add respective controllers for: user-dashboard, support-ticket-page, new-ticket, admin-dashboard

router.get("/user-dashboard", isAuthenticated,isAdmin, (req, res) => {
    res.send("Welcome to the admin dashboard!");
  });

// router.post("/user-dashboard", isAuthenticated,isAdmin)
  

//   router.get("/support-ticket-page", isAuthenticated,isAdmin, (req, res) => {
//     res.send("Welcome to the admin dashboard!");
//   });
//   router.post("/support-ticket-page", isAuthenticated,isAdmin, (req, res) => {
//     res.send("Welcome to the admin dashboard!");
//   });

module.exports = router

