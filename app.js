const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();

console.log(app.get('env'));
console.log(process.env)
console.log(process.env.USER);
// Set EJS as templating engine
app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', urlencodedParser, [
    check('username', 'this username must be 3+ chars long')
        .exists()
        .isLength({min: 3}),
    check('email', 'this email is not valid')
        .isEmail()
        .normalizeEmail()
] , (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        res.render('register', {alert});
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

