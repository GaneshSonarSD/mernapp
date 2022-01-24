const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
    res.render('home')
});

// custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404')
});

// custom 500 page
app.use((err, req, res, nex) => {
    res.status(500);
    res.render('500')
});

app.listen(app.get('port'), () => {
    console.log('express is running on port', app.get('port'));
})