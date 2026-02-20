/**
 * TAROT ONLINE - JAVASCRIPT (GitHub Pages + WebApp simplificado)
 * Funcionalidades: Modal de consulta, validação em 2 etapas, interações
 */

// ========== ELEMENTOS DO DOM ==========
const consultBtns = document.querySelectorAll('#consultBtn, #consultBtn2');
const modal = document.getElementById('consultModal');
const closeModalBtn = document.getElementById('closeModal');
const consultForm = document.getElementById('consultForm');
const successMessage = document.getElementById('successMessage');

const nextStepBtn = document.getElementById('nextStepBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

// ========== FUNÇÕES DE MODAL ==========
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) modalContent.style.animation = 'slideUp 0.4s ease-out';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (consultForm) consultForm.reset();
    if (step1 && step2) {
        step1.style.display = 'block';
        step2.style.display = 'none';
    }
}

function showSuccessMessage() {
    if (!successMessage) return;
    successMessage.classList.add('show');
    setTimeout(() => { successMessage.classList.remove('show'); }, 4000);
}

// ========== EVENT LISTENERS - MODAL ==========
consultBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

// ========== VALIDAÇÕES ==========
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidAge(age) {
    const ageNum = parseInt(age);
    return ageNum >= 18 && ageNum <= 120;
}

// ========== ETAPA 1 -> ETAPA 2 ==========
if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const email = document.getElementById('email').value.trim();
        const objective = document.getElementById('objective').value;

        let errors = [];
        if (!name || name.length < 3) errors.push('Nome deve ter pelo menos 3 caracteres');
        if (!isValidAge(age)) errors.push('Idade deve estar entre 18 e 120 anos');
        if (!isValidEmail(email)) errors.push('Email inválido');
        if (!objective) errors.push('Selecione um objetivo');

        if (errors.length > 0) {
            alert('Erros no formulário:\n\n' + errors.join('\n'));
            return;
        }

        if (step1 && step2) {
            step1.style.display = 'none';
            step2.style.display = 'block';
        }
    });
}

// ========== ENVIO FINAL ==========
if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
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

        processConsultation({ name, age, email, objective, details });
    });
}

// ========== PROCESSAMENTO ==========
function processConsultation(data) {
    const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxsC4OUdJ1h5BVrBTqYNr_7frggbI0Ua67u224lnXY3T_bM61WSMqwwncDAE0g2bnOZ/exec?action=create-payment";

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
    .catch(error => {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    });
}

// ========== EFEITOS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#consultModal') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() { this.parentElement.style.transform = 'scale(1.02)'; });
    input.addEventListener('blur', function() { this.parentElement.style.transform = 'scale(1)'; });
});

// ========== INICIALIZAÇÃO ==========
function init() {
    console.log('Tarot Online - Site inicializado');
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== UTILITÁRIOS ==========
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
}

function debugLog(message, data = null) {
    if (data) console.log(`[DEBUG] ${message}:`, data);
    else console.log(`[DEBUG] ${message}`);
}

window.tarotOnline = {
    openModal,
    closeModal,
    showSuccessMessage,
    processConsultation,
    formatDate,
    debugLog
};
