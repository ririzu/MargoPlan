const express = require("express");
// const bodyParser = require('body-parser')
const app = express(); //run express library
const cors = require("cors");
const pool = require('./db'); //Run queries for postgres
app.use(express.static('public'));
const bcrypt = require('bcrypt');
let PORT =process.env.PORT || 5000;
const jwtGenerator = require('./utils/jwtGenerator');
const validInfo = require('./middleware/validinfo');
const authorization = require('./middleware/authorization');


const users = require("./routes/users");
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

////////////////////////////////////////////////////
//middleware
app.use(cors());

//Henter data fra client
app.use(express.json()); //req.body

///////////////////////////////////////////////////////////////////////////////7


//---------------REGISTER--ROUTE-----------------------------------
app.post('/margoplan/ansatte', validInfo, async (req, res) => {
    try {
        const {for_navn, etter_navn, mobilnr, email, passord, gjenta_passord} = req.body;
        const user = await pool.query(
            'SELECT * FROM ansatte WHERE email = $1', [email]
        );
        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists');
        }
        const saltrounds = 10;
        const salt = await bcrypt.genSalt(saltrounds);
        const bcryptPassword = await bcrypt.hash(passord, salt);
        const bcryptGjentaPassword = await bcrypt.hash(gjenta_passord, salt);

        const newUser = await pool.query(
            'INSERT INTO ansatte (for_navn, etter_navn, mobilnr, email, passord, gjenta_passord) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [for_navn, etter_navn, mobilnr, email, bcryptPassword, bcryptGjentaPassword]
        );
        const token = jwtGenerator(newUser.rows[0].id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(5000).send('Server error');
    }
});


//----------LOGINN--ROUTE----------------------------------------
/*
app.post('/kjopmann/login', validInfo, async (req, res) => {
    try {
        const { email, passord } = req.body;
        const user = await pool.query(
            'SELECT * FROM ansatte WHERE email = $1', [email]
        );
        if (user.rows.length === 0) {
            return res.status(401).json('Password or email is incorrect');
        }
        const validPassword = await bcrypt.compare(passord, user.rows[0].passord);
        if (!validPassword) {
            return res.status(401).json('Password or email is incorrect');
        }
        const token = jwtGenerator(user.rows[0].id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
*/


// -------------verify token------------------------------------------ //
app.get('/margoplan/verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --------AUTORIASJON----------------------------------------------------
app.get('/margoplan/ansatte', authorization, async (req, res) => {
    try {
        const ansatte = await pool.query('SELECT navn FROM ansatte Where id = $1', [req.user]);
        res.json(ansatte.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get a ansatt_id //
app.get('/margoplan/ansatte/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const ansatte = await pool.query('SELECT id FROM ansatte WHERE email =$1;', [email]);
        res.json(ansatte.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/margoplan/ansatte/', async (req, res) => {
    console.log("hei")
    try {
        const user = await pool.query(
            'SELECT * FROM ansatte;'
        )
        res.json(user.rows[0]);

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// ---------------------------------------------------------------------------------------


app.use("/api/users", users);


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })
