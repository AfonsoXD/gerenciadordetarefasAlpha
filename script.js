const formTarefa = document.getElementById("formTarefa");
const descricaoInput = document.getElementById("descricao");
const horaInput = document.getElementById("hora");
const dataInput = document.getElementById("data"); 
const categoriaPersonalizadaInput = document.getElementById("categoriaPersonalizada");
const listaTarefas = document.getElementById("tarefas");
const modalEditar = document.getElementById("modalEditar");
const formEditarTarefa = document.getElementById("formEditarTarefa");
const editarDescricaoInput = document.getElementById("editarDescricao");
const editarHoraInput = document.getElementById("editarHora");
const editarDataInput = document.getElementById("editarData"); 
const editarCategoriaPersonalizadaInput = document.getElementById("editarCategoriaPersonalizada");

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; 


function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


formTarefa.addEventListener("submit", function (e) {
    e.preventDefault();

    const descricao = descricaoInput.value.trim();
    const hora = horaInput.value.trim();
    const data = dataInput.value.trim(); 
    const categoria = categoriaPersonalizadaInput.value.trim();

    if (descricao && hora && data) { 
        const novaTarefa = { descricao, hora, data, categoria, id: Date.now(), concluida: false };
        tarefas.push(novaTarefa);
        salvarTarefas();
        renderizarTarefas();
        descricaoInput.value = ""; 
        horaInput.value = ""; 
        dataInput.value = ""; 
        categoriaPersonalizadaInput.value = ""; 
    }
});


function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = `${tarefa.descricao} - ${tarefa.hora} - ${tarefa.data} (${tarefa.categoria})`;
        if (tarefa.concluida) {
            li.classList.add("concluida");
        }
        const btnExcluir = criarBotao("Excluir", "botao-excluir", () => excluirTarefa(tarefa.id));
        const btnEditar = criarBotao("Editar", "botao-editar", () => editarTarefa(tarefa.id));
        const btnConcluir = criarBotao(tarefa.concluida ? "Concluído" : "Concluir", "botao-concluir", () => concluirTarefa(tarefa.id));
        li.append(btnExcluir, btnEditar, btnConcluir);
        listaTarefas.appendChild(li);
    });
}


function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas();
    renderizarTarefas();
}


function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    tarefa.concluida = true;
    salvarTarefas();
    renderizarTarefas();
}


function criarBotao(texto, classe, acao) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = classe;
    btn.addEventListener("click", acao);
    return btn;
}


function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    editarDescricaoInput.value = tarefa.descricao;
    editarHoraInput.value = tarefa.hora;
    editarDataInput.value = tarefa.data; 
    editarCategoriaPersonalizadaInput.value = tarefa.categoria;
    tarefaEmEdicao = tarefa;
    abrirModal();
}


function abrirModal() {
    modalEditar.style.display = "flex";
}


function fecharModal() {
    modalEditar.style.display = "none";
}


formEditarTarefa.addEventListener("submit", (event) => {
    event.preventDefault();
    if (tarefaEmEdicao) {
        tarefaEmEdicao.descricao = editarDescricaoInput.value.trim();
        tarefaEmEdicao.hora = editarHoraInput.value.trim();
        tarefaEmEdicao.data = editarDataInput.value.trim(); 
        tarefaEmEdicao.categoria = editarCategoriaPersonalizadaInput.value.trim();
        salvarTarefas();
        fecharModal();
        tarefaEmEdicao = null;
        renderizarTarefas();
    }
});


renderizarTarefas();