/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const perrosRoutes = require('./routes/perros');
app.use('/perros', perrosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
*/
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');


const mysql = require('mysql2');
const perrosRoutes = require('./routes/perros');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/perros', perrosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/perros');
});