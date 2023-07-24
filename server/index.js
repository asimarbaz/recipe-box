const express = require('express');
const router = require('./config/routes')
const app = express();
const cors = require('cors')
const configureDb = require('./config/database')
const bodyParser = require('body-parser');

// app.use(cors({
//     origin:'*'
// }))

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/uploads', express.static('uploads'))

const port = 3040;
configureDb()

app.listen(port, () => {
    console.log('server running on port', port);
})