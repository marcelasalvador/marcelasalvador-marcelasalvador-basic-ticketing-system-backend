require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { isAuthenticated, isAdmin } = require("./middleware/jwt.middleware")


const authRouter = require("./routes/auth.routes")
const ticketRouter = require("./routes/ticketPage.routes")
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: '*'
}))



app.use(express.json())
app.use(cookieParser());
app.use("/auth", authRouter)
app.use('/api/admin-dashboard', isAuthenticated, isAdmin, ticketRouter);
app.use('/api/admin-ticket-page', isAuthenticated, isAdmin, ticketRouter)
app.use("/api/user-dashboard", isAuthenticated, ticketRouter)
app.use("/api/user-ticket-page", isAuthenticated, ticketRouter)
app.use("/api/new-ticket", isAuthenticated, ticketRouter)





mongoose.connect(process.env.MONGODB_URI)
  .then(x => {
    console.log('connected to db', x.connections[0].name)
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT)
    });
  })
  .catch(err => console.log('error starting server', err))