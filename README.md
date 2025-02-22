# API de Gestión de Tareas

## Descripción
Esta es una API RESTful para gestionar una lista de tareas utilizando Node.js y Express. Los datos se almacenan en un archivo JSON.

## Requisitos previos
Antes de instalar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

## Instalación
1. Clonar este repositorio:
   ```bash
   git clone https://github.com/xavier20xl/Tarea-API
   ```
2. Instalar las dependencias de Node.js:
   ```bash
   cd proyecto-tareas
   npm install
   ```

## Uso
### Iniciar el servidor
```bash
node index.js
```
El servidor se ejecutará en `http://localhost:3001`.

### Endpoints disponibles
- `GET /tareas` - Obtener todas las tareas.
- `GET /tareas/:id` - Obtener una tarea por ID.
- `POST /tareas` - Crear una nueva tarea.
- `PUT /tareas/:id` - Actualizar una tarea.
- `DELETE /tareas/:id` - Eliminar una tarea.

### Ejemplo de solicitud para crear una tarea
```http
POST http://localhost:3001/tareas
Content-Type: application/json

{
    "titulo": "Nueva tarea",
    "descripcion": "Descripción de al menos 20 caracteres"
}
```

### Notas
- El título es obligatorio.
- La descripción debe tener al menos 20 caracteres.
- Los cambios se guardan en `data/tareas.json`.

### Autores
Desarrollado por: Cxlopez@unah.hn

