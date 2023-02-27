require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { isAuthenticated, isAdmin } = require("./middleware/jwt.middleware")

// const projectRouter = require('./routes/project.routes');
// const taskRouter = require('./routes/task.routes');
const adminRouter = require("./routes/admin.routes")
const authRouter = require("./routes/auth.routes")
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: '*'
}))



app.use(express.json())
app.use(cookieParser());
app.use("/auth", authRouter)
app.use('/api/admin-dashboard', isAuthenticated, isAdmin, adminRouter);





mongoose.connect(process.env.MONGODB_URI)
  .then(x => {
    console.log('connected to db', x.connections[0].name)
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT)
    });
  })
  .catch(err => console.log('error starting server', err))