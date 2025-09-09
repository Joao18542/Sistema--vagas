// Função para carregar as vagas do localStorage
function carregarVagas() {
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    const vagasContainer = document.getElementById('vagas-container');
    
    if (vagas.length === 0) {
        vagasContainer.innerHTML = `
            <div class="vaga-card" style="grid-column: 1 / -1; text-align: center;">
                <p>Nenhuma vaga cadastrada.</p>
                <a href="cadastrar.html" class="btn btn-primary">Cadastrar Primeira Vaga</a>
            </div>
        `;
        return;
    }
    
    vagasContainer.innerHTML = '';
    
    vagas.forEach(vaga => {
        const vagaElement = document.createElement('div');
        vagaElement.className = 'vaga-card';
        vagaElement.innerHTML = `
            <h3 class="vaga-titulo">${vaga.descricao}</h3>
            <div class="vaga-empresa">${vaga.empresa}</div>
            <span class="vaga-modalidade">${vaga.modalidade}</span>
            <p class="vaga-descricao">${vaga.requisitosObrigatorios.substring(0, 100)}...</p>
            <div class="vaga-acoes">
                <a href="#" class="btn btn-primary btn-sm ver-detalhes" data-id="${vaga.id}">Ver Detalhes</a>
                <div>
                    <a href="editar.html?id=${vaga.id}" class="btn btn-secondary btn-sm">Editar</a>
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${vaga.id}">Excluir</button>
                </div>
            </div>
        `;
        
        vagasContainer.appendChild(vagaElement);
    });
    
    // Adicionar event listeners para os botões
    document.querySelectorAll('.ver-detalhes').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            mostrarDetalhesVaga(id);
        });
    });
    
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            prepararExclusaoVaga(id);
        });
    });
}

// Função para mostrar os detalhes de uma vaga
function mostrarDetalhesVaga(id) {
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    const vaga = vagas.find(v => v.id === id);
    
    if (!vaga) {
        alert('Vaga não encontrada!');
        return;
    }
    
    // Criar modal com detalhes da vaga
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Detalhes da Vaga</h3>
            <div class="vaga-detalhes">
                <div class="detalhe-item">
                    <div class="detalhe-label">ID da Vaga</div>
                    <div class="detalhe-valor">${vaga.id}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Descrição do Cargo</div>
                    <div class="detalhe-valor">${vaga.descricao}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Empresa</div>
                    <div class="detalhe-valor">${vaga.empresa}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Modalidade</div>
                    <div class="detalhe-valor">${vaga.modalidade}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Requisitos Obrigatórios</div>
                    <div class="detalhe-valor">${vaga.requisitosObrigatorios}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Requisitos Desejáveis</div>
                    <div class="detalhe-valor">${vaga.requisitosDesejaveis || 'Não informado'}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Remuneração</div>
                    <div class="detalhe-valor">R$ ${vaga.remuneracao.toFixed(2)}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Benefícios</div>
                    <div class="detalhe-valor">${vaga.beneficios || 'Não informado'}</div>
                </div>
                <div class="detalhe-item">
                    <div class="detalhe-label">Local de Trabalho</div>
                    <div class="detalhe-valor">${vaga.localTrabalho}</div>
                </div>
            </div>
            <div class="modal-actions">
                <button id="btn-fechar-detalhes" class="btn btn-secondary">Fechar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    document.getElementById('btn-fechar-detalhes').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Função para preparar a exclusão de uma vaga
function prepararExclusaoVaga(id) {
    const modal = document.getElementById('modal-excluir');
    modal.style.display = 'flex';
    
    document.getElementById('btn-cancelar-exclusao').onclick = () => {
        modal.style.display = 'none';
    };
    
    document.getElementById('btn-confirmar-exclusao').onclick = () => {
        excluirVaga(id);
        modal.style.display = 'none';
    };
}

// Função para excluir uma vaga
function excluirVaga(id) {
    let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    vagas = vagas.filter(vaga => vaga.id !== id);
    localStorage.setItem('vagas', JSON.stringify(vagas));
    
    carregarVagas(); // Recarregar a lista
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarVagas();
});