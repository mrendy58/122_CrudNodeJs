const express = require('express');
const router = express.Router(); // Pastikan Anda menggunakan objek router

let todos = [
    { id: 1, task: 'Belajar Node.js', completed: false },
    { id: 2, task: 'Membuat API', completed: false }
];

// Endpoint untuk mendapatkan data Todos
router.get('/', (req, res) => {
    res.json(todos); // Kirim todos sebagai respon JSON
});

router.post('/',(req,res)=>{
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//Endpoint untuk menghapus tugas
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ message: 'Tugas Tidak Ditemukan' });

    const deletedTodo = todos.splice(todoIndex, 1)[0]; // Menghapus dan menyimpan todo yang dihapus
    res.status(200).json({ message: `Tugas '${deletedTodo.task}' telah dihapus` });
});

//enedpoint untuk memperbarui tugas
router.put('/:id', (req,res)=>{
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: 'Tugas Tidak Ditemukan'});
    todo.task = req.body.task || todo.task;

    res.status(200).json({
        message: 'Tugas Dengan ID ${todo.id} telah diperbarui',
        updatedTod: todo
    });
});


module.exports = router; // Ekspor objek router
