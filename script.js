/**
 * TAROT ONLINE - JAVASCRIPT
 * Funcionalidades: Modal de consulta, validação de formulário, interações
 */

// ========== ELEMENTOS DO DOM ==========
const consultBtns = document.querySelectorAll('#consultBtn, #consultBtn2');
const modal = document.getElementById('consultModal');
const closeModalBtn = document.getElementById('closeModal');
const consultForm = document.getElementById('consultForm');
const successMessage = document.getElementById('successMessage');

// ========== FUNÇÕES DE MODAL ==========

/**
 * Abre o modal de consulta
 */
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animar entrada do modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideUp 0.4s ease-out';
}

/**
 * Fecha o modal de consulta
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    consultForm.reset();
}

/**
 * Mostra mensagem de sucesso
 */
function showSuccessMessage() {
    successMessage.classList.add('show');
    
    // Remove a mensagem após 4 segundos
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 4000);
}

// ========== EVENT LISTENERS - MODAL ==========

// Abre modal ao clicar nos botões de consulta
consultBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

// Fecha modal ao clicar no botão X
closeModalBtn.addEventListener('click', closeModal);

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fecha modal ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ========== VALIDAÇÃO E ENVIO DO FORMULÁRIO ==========

/**
 * Valida o email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida a idade
 */
function isValidAge(age) {
    const ageNum = parseInt(age);
    return ageNum >= 18 && ageNum <= 120;
}

/**
 * Processa o envio do formulário
 */
consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coleta dados do formulário
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const objective = document.getElementById('objective').value;
    
    // Validações
    let errors = [];
    
    if (!name || name.length < 3) {
        errors.push('Nome deve ter pelo menos 3 caracteres');
    }
    
    if (!isValidAge(age)) {
        errors.push('Idade deve estar entre 18 e 120 anos');
    }
    
    if (!isValidEmail(email)) {
        errors.push('Email inválido');
    }
    
    if (!objective) {
        errors.push('Selecione um objetivo');
    }
    
    // Se houver erros, mostra alerta
    if (errors.length > 0) {
        alert('Erros no formulário:\n\n' + errors.join('\n'));
        return;
    }
    
    // Se passou na validação, processa a consulta
    processConsultation({
        name,
        age,
        email,
        objective
    });
});

/**
 * Processa a consulta (simula envio)
 */
function processConsultation(data) {
    console.log('Consulta enviada:', data);
    
    // Aqui você pode enviar os dados para um servidor
    // Por enquanto, apenas simula o envio
    
    // Fecha o modal
    closeModal();
    
    // Mostra mensagem de sucesso
    showSuccessMessage();
    
    // Reseta o formulário
    consultForm.reset();
    
    // Você pode adicionar aqui uma chamada para uma API
    // fetch('/api/consultation', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log('Sucesso:', result);
    //     showSuccessMessage();
    // })
    // .catch(error => {
    //     console.error('Erro:', error);
    //     alert('Erro ao enviar consulta. Tente novamente.');
    // });
}

// ========== EFEITOS E INTERAÇÕES ADICIONAIS ==========

/**
 * Adiciona efeito de scroll suave aos links de navegação
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignora o link se for o modal
        if (href === '#' || href === '#consultModal') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Adiciona animação aos elementos quando entram na viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa elementos com classe 'fade-in'
document.querySelectorAll('.feature, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/**
 * Adiciona efeito de hover nos inputs
 */
const inputs = document.querySelectorAll('input, select');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ========== INICIALIZAÇÃO ==========

/**
 * Inicializa o site
 */
function init() {
    console.log('Tarot Online - Site inicializado');
    
    // Adiciona efeito de fade-in ao carregar
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Executa a inicialização quando o DOM está pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== UTILITÁRIOS ==========

/**
 * Formata a data para exibição
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Log de debug (descomente para usar)
 */
function debugLog(message, data = null) {
    if (data) {
        console.log(`[DEBUG] ${message}:`, data);
    } else {
        console.log(`[DEBUG] ${message}`);
    }
}

// Exporta funções para uso global (se necessário)
window.tarotOnline = {
    openModal,
    closeModal,
    showSuccessMessage,
    processConsultation,
    formatDate,
    debugLog
};
