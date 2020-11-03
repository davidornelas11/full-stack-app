const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

// middleware to help with the form submission
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  })


// mongoose connection logic
mongoose.connect('mongodb://localhost:27017/project2', { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.get('/', (req,res) => {
    res.send('hello world');
});

