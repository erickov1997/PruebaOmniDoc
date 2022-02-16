const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();


app.set('port', process.env.PORT || 3001);

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'omniDoc',
    resave: false,
    saveUninitialized: false
  
  }));

app.use(flash());
app.use(express.json());

app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    next();
  });

app.use(require('./controllers/auth/auth'));
app.use(require('./controllers/application/cashier'));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/arch', express.static(__dirname + '/public/archivos'));

const server = app.listen(app.get('port'), () => {
    console.log('servidor en el puerto: ', app.get('port'));
});



