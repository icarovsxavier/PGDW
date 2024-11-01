//function mostrarCampos() {
    const tipoCadastro = document.getElementById('tipo-cadastro').value;
    const camposFisica = document.getElementById('campos-fisica');
    const camposJuridica = document.getElementById('campos-juridica');
    
    if (tipoCadastro === 'fisica') {
        camposFisica.style.display = 'block';
        camposJuridica.style.display = 'none';
    } else if (tipoCadastro === 'juridica') {
        camposFisica.style.display = 'none';
        camposJuridica.style.display = 'block';
    } else {
        camposFisica.style.display = 'none';
        camposJuridica.style.display = 'none';
    }
//}