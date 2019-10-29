let express = require("express")

let registerRoute = require('./routes/registerRoute')
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser')
let session = require('express-session')
let loginRoute = require('./routes/loginRoute')
const MongoStore = require('connect-mongo')(session);
 

//Connecting to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('connected to DB') })



// app.use(session({
//     secret: 'hndkahav',
//     store: new MongoStore("")
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(session({
    secret:'hndkahav',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:1000*30}
}))

app.use((req,res,next) => {
    res.locals.session = req.session
    next()
})

app.use('/register',registerRoute)

app.use('/login',loginRoute)

app.listen(3000)












