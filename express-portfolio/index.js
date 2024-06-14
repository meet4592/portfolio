const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set up Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/skills', (req, res) => {
    res.render('skills');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
