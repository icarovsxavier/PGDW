function mostrarCampos() {
    const tipoCadastro = document.getElementById('tipo-cadastro').value;
    document.getElementById('campos-fisica').style.display = tipoCadastro === 'fisica' ? 'block' : 'none';
    document.getElementById('campos-juridica').style.display = tipoCadastro === 'juridica' ? 'block' : 'none';
}

function validarFormulario() {
    limparErros();

    const tipoCadastro = document.getElementById('tipo-cadastro').value;
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value.trim();
    const confirmaSenha = document.getElementById('confirm-password').value.trim();
    const nascimento = document.getElementById('nascimento').value.trim();
    let isValid = true;

    if (!tipoCadastro) { setError('tipo-error', "Selecione o tipo de cadastro."); isValid = false; }

    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('email-error', "Insira um email válido."); isValid = false; }

    if (!senha || senha.length < 8) {
        setError('password-error', "A senha deve ter pelo menos 8 caracteres.");
        isValid = false;
    }
    if (senha !== confirmaSenha) { setError('confirm-password-error', "Confirmação de senha não corresponde."); isValid = false; }

    if (tipoCadastro === 'fisica') {
        if (!nome) { setError('nome-error', "Nome é obrigatório."); isValid = false; }
        if (!validarCPF(cpf)) { setError('cpf-error', "CPF inválido."); isValid = false; }
        if (!nascimento) { setError('nascimento-error', "Data de nascimento obrigatória."); isValid = false; }
    }

    if (tipoCadastro === 'juridica') {
        if (!cnpj || !validarCNPJ(cnpj)) { setError('cnpj-error', "CNPJ inválido."); isValid = false; }
    }

    if (isValid) {
        salvarDadosLocalStorage(tipoCadastro, nome, cpf, cnpj, email);
        window.location.href = "dashboard.html";
    }

    return false;
}

function limparErros() {
    document.querySelectorAll('.error').forEach(span => span.textContent = '');
}

function setError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function formatarCPF(campo) {
    campo.value = campo.value.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatarCNPJ(campo) {
    campo.value = campo.value.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function validarCPF(cpf) {
    return /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(cpf);
}

function validarCNPJ(cnpj) {
    return /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/.test(cnpj);
}

function salvarDadosLocalStorage(tipoCadastro, nome, cpf, cnpj, email) {
    const usuario = { tipoCadastro, nome, cpf, cnpj, email };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log("Dados salvos no Local Storage:", usuario);
}
