
CREATE DATABASE GerenciadorTarefas;


USE GerenciadorTarefas;


CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    status ENUM('pendente', 'concluído') DEFAULT 'pendente'
);
