document.addEventListener('DOMContentLoaded', () => {
    // Número de WhatsApp da Barbearia (Altere para o número real com DDD)
    const BARBERSHOP_PHONE = "5511999999999";

    /* =========================================
       1. MENU MOBILE & SCROLL DO HEADER
    ========================================= */
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('ph-list');
        icon.classList.toggle('ph-x');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('ph-list');
            icon.classList.remove('ph-x');
        });
    });

    /* =========================================
       2. SELECIONAR SERVIÇO DIRETO PARA O FORMULÁRIO
    ========================================= */
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('service-select');
    const bookingSection = document.getElementById('agendamento');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedService = card.getAttribute('data-service');
            serviceSelect.value = selectedService;
            
            // Rola suavemente até o formulário de agendamento
            bookingSection.scrollIntoView({ behavior: 'smooth' });
            
            // Destaque visual rápido no select
            serviceSelect.style.borderColor = '#d4a359';
            setTimeout(() => {
                serviceSelect.style.borderColor = '';
            }, 1500);
        });
    });

    /* =========================================
       3. DEFINIR DATA MÍNIMA COMO HOJE
    ========================================= */
    const dateInput = document.getElementById('booking-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    /* =========================================
       4. ENVIO DO AGENDAMENTO PARA O WHATSAPP
    ========================================= */
    const bookingForm = document.getElementById('booking-form');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('client-name').value.trim();
        const service = document.getElementById('service-select').value;
        const barber = document.getElementById('barber-select').value;
        const rawDate = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;

        // Formatar data de AAAA-MM-DD para DD/MM/AAAA
        const [year, month, day] = rawDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        // Montar mensagem formatada para WhatsApp
        const message = 
            `Olá, *Imperium Barber Club*! Gostaria de confirmar um agendamento:\n\n` +
            `*Cliente:* ${name}\n` +
            `*Serviço:* ${service}\n` +
            `*Profissional:* ${barber}\n` +
            `*Data:* ${formattedDate}\n` +
            `*Horário:* ${time}\n\n` +
            `Aguardo a confirmação!`;

        const whatsappURL = `https://wa.me/${BARBERSHOP_PHONE}?text=${encodeURIComponent(message)}`;
        
        // Abre o WhatsApp em nova aba
        window.open(whatsappURL, '_blank');
    });
});