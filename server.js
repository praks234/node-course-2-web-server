const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.Port || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance Page',
//         message: 'Our website is under maintenance. Please come agin later !'
//     });
// });

app.use(express.static(__dirname+"/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome Buddy !'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        name: "Bad Request",
        errorMessage: "Something went wrong!"
    })
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
