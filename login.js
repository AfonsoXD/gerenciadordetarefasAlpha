const loginForm = document.getElementById("loginForm");
const nomeUsuarioInput = document.getElementById("nomeUsuario");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeUsuario = nomeUsuarioInput.value.trim();

    if (nomeUsuario) {
        // Salva o nome no localStorage
        localStorage.setItem("nomeUsuario", nomeUsuario);

        // Redireciona para a aplicação principal
        window.location.href = "index.html"; // Página principal do aplicativo
    } else {
        alert("Por favor, insira seu nome para continuar.");
    }
});
