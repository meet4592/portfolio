require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Check if environment variables are loaded correctly
// console.log('Email:', process.env.EMAIL);
// console.log('Email Password:', process.env.EMAIL_PASSWORD);

// Set up Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me' });
});

app.get('/resume', (req, res) => {
    res.render('resume', { title: 'Resume' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Information' });
});

app.get('/skills', (req, res) => {
    res.render('skills', { title: 'Skills and Achievements' });
});

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Contact form submission from ${name}`,
        text: `You have received a new message from your contact form.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/contact');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
