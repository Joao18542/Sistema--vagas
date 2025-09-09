document.addEventListener('DOMContentLoaded', () => {
    const formVaga = document.getElementById('form-vaga');
    const alertCadastro = document.getElementById('alert-cadastro');
    
    formVaga.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação dos campos
        if (!validarFormulario()) {
            mostrarAlerta(alertCadastro, 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Coleta os dados do formulário
        const vaga = {
            id: document.getElementById('idvaga').value,
            descricao: document.getElementById('descricao').value,
            empresa: document.getElementById('empresa').value,
            modalidade: document.getElementById('modalidade').value,
            requisitosObrigatorios: document.getElementById('requisitosObrigatorios').value,
            requisitosDesejaveis: document.getElementById('requisitosDesejaveis').value,
            remuneracao: parseFloat(document.getElementById('remuneracao').value),
            beneficios: document.getElementById('beneficios').value,
            localTrabalho: document.getElementById('localTrabalho').value
        };
        
        // Verifica se já existe uma vaga com esse ID
        const vagasExistentes = JSON.parse(localStorage.getItem('vagas')) || [];
        if (vagasExistentes.some(existing => existing.id === vaga.id)) {
            mostrarAlerta(alertCadastro, 'Já existe uma vaga com este ID. Por favor, use um ID único.', 'error');
            return;
        }
        
        // Adiciona a vaga à lista
        vagasExistentes.push(vaga);
        localStorage.setItem('vagas', JSON.stringify(vagasExistentes));
        
        // Feedback para o usuário
        mostrarAlerta(alertCadastro, 'Vaga cadastrada com sucesso!', 'success');
        
        // Limpa o formulário
        formVaga.reset();
        
        // Redireciona para a página principal após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    // Função para validar o formulário
    function validarFormulario() {
        const idvaga = document.getElementById('idvaga').value;
        const descricao = document.getElementById('descricao').value;
        const empresa = document.getElementById('empresa').value;
        const modalidade = document.getElementById('modalidade').value;
        const requisitosObrigatorios = document.getElementById('requisitosObrigatorios').value;
        const remuneracao = document.getElementById('remuneracao').value;
        const localTrabalho = document.getElementById('localTrabalho').value;
        
        return idvaga && descricao && empresa && modalidade && requisitosObrigatorios && remuneracao && localTrabalho;
    }
    
    // Função para mostrar alertas
    function mostrarAlerta(elemento, mensagem, tipo) {
        elemento.textContent = mensagem;
        elemento.classList.remove('success', 'error', 'info');
        elemento.classList.add(tipo);
        elemento.style.display = 'block';
        
        // Esconde o alerta após 5 segundos
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 5000);
    }
});