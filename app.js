const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017' + 'full-stack-app1'

// middleware to help with the form submission
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json())

// Set port for app to listen to
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})

// Require the message schema
const Message = require('./models/messageOutline.js')



// mongoose connection logic
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// Show all messages
app.get('/', (req, res) => {
    Message.find({}, (error, allMessages) => {
        res.render('index.ejs', {
            Messages: allMessages
        });
    });

});

// Show page to create post
app.get('/create', (req, res) => {
    res.render('createPost.ejs');
});


// Post new message
app.post('/', (req, res) => {
    Message.create(req.body, (error, createdMessage) => {
        res.redirect('/');
    })
})

// Show edit page
app.get('/:id/edit', (req, res) => {
    Message.findById(req.params.id, (err, foundMessage) => {
        res.render('updateMessage.ejs',
            {
                Messages: foundMessage
            })
    })
})

app.put('/:id', (req, res) => {
    Message.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        res.redirect('/');
    });
});

// Delete message
app.delete('/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data) => {
        res.redirect('/')
    });
});
