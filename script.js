/**
 * TAROT ONLINE - JAVASCRIPT
 * Funcionalidades: Modal de consulta, validação em 2 etapas, redirecionamento para pagamento
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========== ELEMENTOS DO DOM ==========
    const consultBtns = document.querySelectorAll('#consultBtn, #consultBtn2');
    const modal = document.getElementById('consultModal');
    const closeModalBtn = document.getElementById('closeModal');
    const consultForm = document.getElementById('consultForm');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // ========== FUNÇÕES DE MODAL ==========
    function openModal() {
        if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        consultForm?.reset();
        if (step1) step1.style.display = 'block';
        if (step2) step2.style.display = 'none';
    }

    // ========== EVENT LISTENERS ==========
    consultBtns?.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal?.style.display === 'flex') closeModal();
    });

    // ========== VALIDAÇÕES ==========
    function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    function isValidAge(age) { const n = parseInt(age); return n >= 18 && n <= 120; }

    // ========== ETAPA 1 -> ETAPA 2 ==========
    nextStepBtn?.addEventListener('click', () => {
        const name = document.getElementById('name')?.value.trim() || '';
        const age = document.getElementById('age')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const objective = document.getElementById('objective')?.value || '';

        const errors = [];
        if (!name || name.length < 3) errors.push('Nome deve ter pelo menos 3 caracteres');
        if (!isValidAge(age)) errors.push('Idade deve estar entre 18 e 120 anos');
        if (!isValidEmail(email)) errors.push('Email inválido');
        if (!objective) errors.push('Selecione um objetivo');

        if (errors.length > 0) { alert('Erros no formulário:\n\n' + errors.join('\n')); return; }

        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
    });

    // ========== ENVIO FINAL ==========
    consultForm?.addEventListener('submit', e => {
        e.preventDefault();

        const details = document.getElementById('details')?.value.trim() || '';
        if (!details || details.length < 10) {
            alert('Por favor, descreva sua situação com mais detalhes.');
            return;
        }

        // Redireciona para o Web App do Mercado Pago
        const WEBAPP_URL = "https://script.google.com/macros/s/SEU_WEBAPP_ID/exec"; // <== TROQUE pelo seu Web App ID
        window.location.href = WEBAPP_URL + "?action=create-payment";
    });

    // ========== INICIALIZAÇÃO ==========
    console.log("Tarot Online - JS carregado e inicializado");

});
