const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;

L
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'seu_usuario', 
    password: 'sua_senha', 
    database: 'GerenciadorTarefas', 
});


db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

app.use(cors());
app.use(express.json());


app.get('/tarefas', (req, res) => {
    db.query('SELECT * FROM tarefas', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar tarefas');
        }
        res.json(results);
    });
});


app.post('/tarefas', (req, res) => {
    const { descricao, categoria } = req.body;
    const sql = 'INSERT INTO tarefas (descricao, categoria) VALUES (?, ?)';
    db.query(sql, [descricao, categoria], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao adicionar tarefa');
        }
        const novaTarefa = { id: result.insertId, descricao, categoria, status: 'pendente' };
        res.status(201).json(novaTarefa);
    });
});


app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tarefas WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao excluir tarefa');
        }
        res.status(204).send();
    });
});


app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE tarefas SET status = ? WHERE id = ?', ['concluído', id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao concluir tarefa');
        }
        res.status(200).send('Tarefa concluída');
    });
});


app.put('/tarefas/:id/editar', (req, res) => {
    const { id } = req.params;
    const { descricao, categoria } = req.body;
    const sql = 'UPDATE tarefas SET descricao = ?, categoria = ? WHERE id = ?';
    db.query(sql, [descricao, categoria, id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao editar tarefa');
        }
        res.status(200).send('Tarefa editada com sucesso');
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
