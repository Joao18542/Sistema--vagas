document.addEventListener('DOMContentLoaded', () => {
    const formEditarVaga = document.getElementById('form-editar-vaga');
    const alertEdicao = document.getElementById('alert-edicao');
    
    // Obter o ID da vaga da URL
    const urlParams = new URLSearchParams(window.location.search);
    const vagaId = urlParams.get('id');
    
    if (!vagaId) {
        mostrarAlerta(alertEdicao, 'Nenhuma vaga selecionada para edição.', 'error');
        return;
    }
    
    // Carregar os dados da vaga
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    const vaga = vagas.find(v => v.id === vagaId);
    
    if (!vaga) {
        mostrarAlerta(alertEdicao, 'Vaga não encontrada.', 'error');
        return;
    }
    
    // Preencher o formulário com os dados da vaga
    document.getElementById('idvaga').value = vaga.id;
    document.getElementById('descricao').value = vaga.descricao;
    document.getElementById('empresa').value = vaga.empresa;
    document.getElementById('modalidade').value = vaga.modalidade;
    document.getElementById('requisitosObrigatorios').value = vaga.requisitosObrigatorios;
    document.getElementById('requisitosDesejaveis').value = vaga.requisitosDesejaveis || '';
    document.getElementById('remuneracao').value = vaga.remuneracao;
    document.getElementById('beneficios').value = vaga.beneficios || '';
    document.getElementById('localTrabalho').value = vaga.localTrabalho;
    
    formEditarVaga.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação dos campos
        if (!validarFormulario()) {
            mostrarAlerta(alertEdicao, 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Coleta os dados do formulário
        const vagaEditada = {
            id: vagaId, // Mantém o mesmo ID
            descricao: document.getElementById('descricao').value,
            empresa: document.getElementById('empresa').value,
            modalidade: document.getElementById('modalidade').value,
            requisitosObrigatorios: document.getElementById('requisitosObrigatorios').value,
            requisitosDesejaveis: document.getElementById('requisitosDesejaveis').value,
            remuneracao: parseFloat(document.getElementById('remuneracao').value),
            beneficios: document.getElementById('beneficios').value,
            localTrabalho: document.getElementById('localTrabalho').value
        };
        
        // Atualiza a vaga na lista
        const index = vagas.findIndex(v => v.id === vagaId);
        if (index !== -1) {
            vagas[index] = vagaEditada;
            localStorage.setItem('vagas', JSON.stringify(vagas));
            
            // Feedback para o usuário
            mostrarAlerta(alertEdicao, 'Vaga atualizada com sucesso!', 'success');
            
            // Redireciona para a página principal após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            mostrarAlerta(alertEdicao, 'Erro ao atualizar a vaga.', 'error');
        }
    });
    
    // Função para validar o formulário
    function validarFormulario() {
        const descricao = document.getElementById('descricao').value;
        const empresa = document.getElementById('empresa').value;
        const modalidade = document.getElementById('modalidade').value;
        const requisitosObrigatorios = document.getElementById('requisitosObrigatorios').value;
        const remuneracao = document.getElementById('remuneracao').value;
        const localTrabalho = document.getElementById('localTrabalho').value;
        
        return descricao && empresa && modalidade && requisitosObrigatorios && remuneracao && localTrabalho;
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