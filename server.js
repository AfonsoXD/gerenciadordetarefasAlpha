const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tarefas = [
    { id: 1, descricao: 'Estudar Node.js', categoria: 'Estudo', status: 'pendente' },
    { id: 2, descricao: 'Fazer compras', categoria: 'Casa', status: 'pendente' },
];


app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});


app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body;
    novaTarefa.id = tarefas.length + 1;
    novaTarefa.status = 'pendente';
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});


app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    tarefas = tarefas.filter(tarefa => tarefa.id !== parseInt(id));
    res.status(204).send();
});


app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (tarefa) {
        tarefa.status = 'concluído';
        res.json(tarefa);
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});


app.put('/tarefas/:id/editar', (req, res) => {
    const { id } = req.params;
    const { descricao, categoria } = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));

    if (tarefa) {
        if (descricao) tarefa.descricao = descricao;
        if (categoria) tarefa.categoria = categoria;
        res.json(tarefa);
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
