const express = require('express');
const fs = require('fs');
const router = express.Router();
const DATA_FILE = './data/tareas.json';

const cargarTareas = () => {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const guardarTareas = (tareas) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tareas, null, 2));
};

router.get('/', (req, res) => {
    res.json(cargarTareas());
});

router.get('/:id', (req, res) => {
    const tareas = cargarTareas();
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
});

router.post('/', (req, res) => {
    const { titulo, descripcion } = req.body;
    if (!titulo) return res.status(400).json({ mensaje: 'El título es obligatorio' });
    if (!descripcion || descripcion.length < 20) return res.status(400).json({ mensaje: 'Descripción debe tener al menos 20 caracteres' });
    const tareas = cargarTareas();
    const nuevaTarea = {
        id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
        titulo,
        descripcion,
        completada: false,
        fecha_creacion: new Date().toISOString()
    };
    tareas.push(nuevaTarea);
    guardarTareas(tareas);
    res.status(201).json(nuevaTarea);
});

router.put('/:id', (req, res) => {
    const { titulo, descripcion, completada } = req.body;
    const tareas = cargarTareas();
    const tareaIndex = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (tareaIndex === -1) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    if (titulo) tareas[tareaIndex].titulo = titulo;
    if (descripcion) tareas[tareaIndex].descripcion = descripcion;
    if (completada !== undefined) tareas[tareaIndex].completada = completada;
    guardarTareas(tareas);
    res.json(tareas[tareaIndex]);
});

router.delete('/:id', (req, res) => {
    let tareas = cargarTareas();
    const tareasFiltradas = tareas.filter(t => t.id !== parseInt(req.params.id));
    if (tareas.length === tareasFiltradas.length) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    guardarTareas(tareasFiltradas);
    res.json({ mensaje: 'Tarea eliminada' });
});

module.exports = router;