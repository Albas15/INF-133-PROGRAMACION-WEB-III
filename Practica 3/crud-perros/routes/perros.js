/*
const express = require('express');
const router = express.Router();
const conexion = require('../models/database');

// Mostrar todos los perros (READ)
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM perros', (err, resultados) => {
        if (err) throw err;
        res.render('index', { perros: resultados });
    });
});

// Formulario para agregar perro (CREATE)
router.get('/nuevo', (req, res) => {
    res.render('form', { perro: {} });
});

// Guardar nuevo perro en la BD
router.post('/nuevo', (req, res) => {
    const { nombre, raza, edad } = req.body;
    conexion.query('INSERT INTO perros (nombre, raza, edad) VALUES (?, ?, ?)', [nombre, raza, edad], (err) => {
        if (err) throw err;
        res.redirect('/perros');
    });
});

// Formulario para editar perro (UPDATE)
router.get('/editar/:id', (req, res) => {
    conexion.query('SELECT * FROM perros WHERE id = ?', [req.params.id], (err, resultado) => {
        if (err) throw err;
        res.render('form', { perro: resultado[0] });
    });
});

// Actualizar perro
router.put('/editar/:id', (req, res) => {
    const { nombre, raza, edad } = req.body;
    conexion.query('UPDATE perros SET nombre=?, raza=?, edad=? WHERE id=?', [nombre, raza, edad, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/perros');
    });
});

// Eliminar perro (DELETE)
router.delete('/borrar/:id', (req, res) => {
    conexion.query('DELETE FROM perros WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/perros');
    });
});

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const conexion = require('../database/db');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM perros', (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.render('index', { perros: resultados });
        }
    });
});

router.get('/nuevo', (req, res) => {
    res.render('form', { perro: {} });
});

router.post('/nuevo', (req, res) => {
    const { nombre, raza, edad } = req.body;
    conexion.query('INSERT INTO perros (nombre, raza, edad) VALUES (?, ?, ?)', [nombre, raza, edad], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al agregar el perro');
        } else {
            res.redirect('/perros');
        }
    });
});

router.get('/editar/:id', (req, res) => {
    conexion.query('SELECT * FROM perros WHERE id = ?', [req.params.id], (err, resultado) => {
        if (err || resultado.length === 0) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.render('form', { perro: resultado[0] });
        }
    });
});

router.put('/editar/:id', (req, res) => {
    const { nombre, raza, edad } = req.body;
    conexion.query('UPDATE perros SET nombre = ?, raza = ?, edad = ? WHERE id = ?', [nombre, raza, edad, req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar el perro');
        } else {
            res.redirect('/perros');
        }
    });
});

router.delete('/borrar/:id', (req, res) => {
    conexion.query('DELETE FROM perros WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar el perro');
        } else {
            res.json({ success: true, message: "Perro eliminado correctamente" });

        }
    });
});

module.exports = router;
