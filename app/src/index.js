const path = require('path');
const express = require('express');
const morgan = require('morgan');
var Handlebars = require('handlebars');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(cookieParser());

const SortMiddleware = require('./app/middlewares/Sortmiddleware');

Handlebars.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});



const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');

// Connect to db
db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);
// XMLHttpRequest, fetch, axios

// HTTP logger
app.use(morgan('combined'));

// Template engine setup
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log('PATH:', path.join(__dirname, 'resources/views'))

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
