/**
 * TAROT ONLINE - JAVASCRIPT
 * Funcionalidades: Modal de consulta, validação em 2 etapas, interações
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
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (consultForm) consultForm.reset();
        if (step1 && step2) {
            step1.style.display = 'block';
            step2.style.display = 'none';
        }
    }

    // ========== EVENT LISTENERS ==========
    consultBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // ========== VALIDAÇÕES ==========
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidAge(age) {
        const n = parseInt(age);
        return n >= 18 && n <= 120;
    }

    // ========== ETAPA 1 -> ETAPA 2 ==========
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const email = document.getElementById('email').value.trim();
            const objective = document.getElementById('objective').value;

            const errors = [];
            if (!name || name.length < 3) errors.push('Nome deve ter pelo menos 3 caracteres');
            if (!isValidAge(age)) errors.push('Idade deve estar entre 18 e 120 anos');
            if (!isValidEmail(email)) errors.push('Email inválido');
            if (!objective) errors.push('Selecione um objetivo');

            if (errors.length > 0) {
                alert('Erros no formulário:\n\n' + errors.join('\n'));
                return;
            }

            step1.style.display = 'none';
            step2.style.display = 'block';
        });
    }

    // ========== ENVIO FINAL ==========
    if (consultForm) {
        consultForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const email = document.getElementById('email').value.trim();
            const objective = document.getElementById('objective').value;
            const details = document.getElementById('details').value.trim();

            if (!details || details.length < 10) {
                alert('Por favor, descreva sua situação com mais detalhes.');
                return;
            }

            const payload = { name, age, email, objective, details };
            sendToWebApp(payload);
        });
    }

    // ========== FUNÇÃO DE ENVIO ==========
    function sendToWebApp(data) {
        const WEBAPP_URL = "https://script.google.com/macros/s/SEU_WEBAPP_ID/exec?action=create-payment";

        fetch(WEBAPP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.init_point) {
                window.location.href = res.init_point; // redireciona para pagamento
            } else {
                console.error("Erro ao gerar pagamento:", res);
                alert("Erro ao gerar pagamento. Verifique os logs.");
            }
        })
        .catch(err => {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Erro ao conectar com o servidor.");
        });
    }

    // ========== INICIALIZAÇÃO ==========
    console.log("Tarot Online - JS carregado e inicializado");

});
