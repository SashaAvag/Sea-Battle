let express = require("express")
let registerRoute = require('./routes/registerRoute')
let app = express();
let bodyParser = require('body-parser')
let loginRoute = require('./routes/loginRoute')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.use('/register',registerRoute)

app.use('/login',loginRoute)

app.listen(3000)






















// var user = {
//         nickname: req.body.nickname,
//         password: req.body.password,
//         wins: 0,
//         fails: 0, 
//         isOnline: 0
//       };