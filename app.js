import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

let tareas = [
  { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', completada: false, fechaCreacion: new Date() },
  { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', completada: false, fechaCreacion: new Date() }
];

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).send('Tarea no encontrada');
  res.json(tarea);
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    completada: false,
    fechaCreacion: new Date()
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).send('Tarea no encontrada');

  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.completada = req.body.completada;
  res.json(tarea);
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const tareaIndex = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (tareaIndex === -1) return res.status(404).send('Tarea no encontrada');

  const tareaEliminada = tareas.splice(tareaIndex, 1);
  res.json(tareaEliminada);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});