// --- Seleção de Elementos ---
const inputBusca = document.getElementById('input-busca');
const btnBusca = document.getElementById('btn-busca');
const containerResultadosBusca = document.getElementById('container-resultados-busca');
const containerMinhaEstante = document.getElementById('container-minha-estante');
const spinner = document.getElementById('spinner-container');

const apiUrl = 'http://localhost:5041/api/livros'; // ATENÇÃO: Verifique a porta

// --- Funções de UX ---
const showSpinner = () => spinner.classList.remove('hidden');
const hideSpinner = () => spinner.classList.add('hidden');

function showNotification(message, type = 'success') {
    const className = type === 'success' ? 'toast-success' : 'toast-error';
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: className
    }).showToast();
}

// INÍCIO DA MUDANÇA: Substituindo o confirm() por um Toast
function showConfirmationToast(id) {
    Toastify({
        text: `
            Tem certeza que deseja remover este livro?
            <button class="toast-button confirm">Sim</button>
            <button class="toast-button cancel">Não</button>
        `,
        duration: -1, // Fica na tela até o usuário interagir
        close: true,
        gravity: "top",
        position: "center",
        className: "toast-confirmation",
        escapeMarkup: false, // Permite que o HTML do botão seja renderizado
        onClick: function(){} // Sobrescreve o onClick padrão para evitar que feche
    }).showToast();

    // Adiciona os eventos aos botões dentro do toast
    document.querySelector('.toast-button.confirm').addEventListener('click', () => {
        removerLivroDaEstante(id, true);
        Toastify.reposition(); // Limpa os toasts
    });
    document.querySelector('.toast-button.cancel').addEventListener('click', () => {
        Toastify.reposition();
    });
}
// FIM DA MUDANÇA

// --- Funções da API Local (Minha Estante) ---
// Função remover MODIFICADA para aceitar a confirmação do Toast
async function removerLivroDaEstante(id, confirmado = false) {
    if (!confirmado) {
        showConfirmationToast(id);
        return;
    }
    
    showSpinner();
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            showNotification('Livro removido com sucesso!');
            await carregarLivrosDaEstante();
        } else {
            showNotification('Erro ao remover o livro.', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão ao remover o livro.', 'error');
    } finally {
        hideSpinner();
    }
}
// O restante das funções agora usa showNotification em vez de alert
async function editarLivroDaEstante(livroOriginal) {
    const novoStatus = prompt('Digite o novo status (Quero Ler, Lendo, Lido):', livroOriginal.status);
    if (novoStatus === null) return;
    if (!['Quero Ler', 'Lendo', 'Lido'].includes(novoStatus)) { return showNotification('Status inválido.', 'error'); }
    let novaNota = livroOriginal.nota;
    if (novoStatus === 'Lido') {
        const notaInput = prompt('Digite a sua nota (0 a 10):', livroOriginal.nota || '');
        if (notaInput !== null) {
            novaNota = parseInt(notaInput);
            if (isNaN(novaNota) || novaNota < 0 || novaNota > 10) { return showNotification('Nota inválida.', 'error'); }
        }
    } else { novaNota = null; }
    const livroAtualizado = { ...livroOriginal, status: novoStatus, nota: novaNota };
    showSpinner();
    try {
        const response = await fetch(`${apiUrl}/${livroAtualizado.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(livroAtualizado) });
        if (response.ok) { showNotification('Livro atualizado!'); await carregarLivrosDaEstante(); } 
        else { showNotification('Erro ao atualizar.', 'error'); }
    } catch (error) { showNotification('Erro de conexão.', 'error'); } 
    finally { hideSpinner(); }
}
async function adicionarLivroNaEstante(livro) {
    showSpinner();
    try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(livro) });
        if (response.ok) { showNotification('Livro adicionado à estante!'); await carregarLivrosDaEstante(); } 
        else { showNotification('Erro ao adicionar.', 'error'); }
    } catch (error) { showNotification('Erro de conexão.', 'error'); } 
    finally { hideSpinner(); }
}

// O resto do JS permanece funcionalmente o mesmo...
function exibirLivrosDaEstante(livros) {
    containerMinhaEstante.innerHTML = '';
    if (!livros || livros.length === 0) { containerMinhaEstante.innerHTML = '<p style="text-align: center; width: 100%;">Sua estante parece um pouco vazia...</p>'; return; }
    livros.forEach(livro => {
        const cardHtml = ` <div class="livro-card"> <img src="${livro.urlCapa}" alt="Capa do livro ${livro.titulo}"> <h3>${livro.titulo}</h3> <p>${livro.autor}</p> <p><strong>Status:</strong> ${livro.status}</p> <p><strong>Nota:</strong> ${livro.nota !== null ? livro.nota : 'N/A'}</p> <button class="btn-editar" data-livro='${JSON.stringify(livro)}'>Editar</button> <button class="btn-remover" data-id="${livro.id}">Remover</button> </div> `;
        containerMinhaEstante.innerHTML += cardHtml;
    });
    document.querySelectorAll('.btn-editar').forEach(button => { button.addEventListener('click', (event) => { const livro = JSON.parse(event.target.dataset.livro); editarLivroDaEstante(livro); }); });
    document.querySelectorAll('.btn-remover').forEach(button => { button.addEventListener('click', (event) => { removerLivroDaEstante(event.target.dataset.id); }); });
}
async function carregarLivrosDaEstante() {
    showSpinner();
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) throw new Error("Erro na rede");
        const livros = await response.json();
        exibirLivrosDaEstante(livros);
    } catch (error) {
        showNotification('Não foi possível carregar sua estante.', 'error');
        containerMinhaEstante.innerHTML = '<p style="text-align: center; width: 100%;">Ocorreu um erro ao conectar ao servidor.</p>';
    } finally {
        hideSpinner();
    }
}
async function buscarLivrosGoogleApi() {
    const termoBusca = inputBusca.value;
    if (termoBusca === '') { return showNotification('Digite um termo para a busca.', 'error'); }
    const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${termoBusca}&maxResults=12`;
    showSpinner();
    try {
        const response = await fetch(googleApiUrl);
        const data = await response.json();
        exibirResultadosBusca(data.items);
    } catch (error) { showNotification('Erro ao buscar na Google API.', 'error'); } 
    finally { hideSpinner(); }
}
function exibirResultadosBusca(livros) {
    containerResultadosBusca.innerHTML = '';
    if (!livros || livros.length === 0) { containerResultadosBusca.innerHTML = '<p>Nenhum livro encontrado para este termo.</p>'; return; }
    livros.forEach(livro => {
        const info = livro.volumeInfo;
        const urlCapa = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=Sem+Capa';
        const autor = info.authors ? info.authors[0] : 'Autor desconhecido';
        const titulo = info.title;
        const cardHtml = ` <div class="livro-card"> <img src="${urlCapa}" alt="Capa do livro ${titulo}"> <h3>${titulo}</h3> <p>${autor}</p> <button class="btn-adicionar" data-api-id="${livro.id}" data-titulo="${titulo}" data-autor="${autor}" data-url-capa="${urlCapa}">Adicionar</button> </div> `;
        containerResultadosBusca.innerHTML += cardHtml;
    });
    document.querySelectorAll('.btn-adicionar').forEach(button => { button.addEventListener('click', (event) => { const btn = event.target; const novoLivro = { apiId: btn.dataset.apiId, titulo: btn.dataset.titulo, autor: btn.dataset.autor, urlCapa: btn.dataset.urlCapa, status: "Quero Ler", nota: null }; adicionarLivroNaEstante(novoLivro); }); });
}
btnBusca.addEventListener('click', buscarLivrosGoogleApi);
carregarLivrosDaEstante();