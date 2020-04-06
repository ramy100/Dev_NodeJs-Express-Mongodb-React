const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
//connect Database
connectDB();

// init middleware
app.use(cors());

app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
