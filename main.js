document.addEventListener('DOMContentLoaded', () => {
    // Loader logic
    const loader = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = '';
        }, 1500); // 1.5 segundos de espera
    });

    // Prevenir scroll mientras carga
    document.body.style.overflow = 'hidden';

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simplificar la lógica del menú móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en los enlaces
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Animación para las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-in-out';
        observer.observe(card);
    });

    // Modal de precios
    const modal = document.getElementById('preciosModal');
    const preciosBtn = document.getElementById('preciosBtn');
    const closeBtn = document.querySelector('.close');

    if (preciosBtn && modal) {
        preciosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Toggle de precios mejorado
    const togglePreciosBtn = document.getElementById('togglePrecios');
    const preciosContent = document.getElementById('preciosContent');

    if (togglePreciosBtn && preciosContent) {
        togglePreciosBtn.addEventListener('click', () => {
            preciosContent.classList.toggle('show');
            togglePreciosBtn.classList.toggle('active');
            
            const buttonSpan = togglePreciosBtn.querySelector('span');
            const buttonIcon = togglePreciosBtn.querySelector('i');
            
            if (preciosContent.classList.contains('show')) {
                buttonSpan.textContent = 'Ocultar precios';
                buttonIcon.style.transform = 'rotate(180deg)';
            } else {
                buttonSpan.textContent = 'Ver lista de precios';
                buttonIcon.style.transform = 'rotate(0)';
            }
        });
    }

    // Nueva lógica simplificada para el modal de reserva
    const reservationModal = document.getElementById('reservationModal');
    const reservationForm = document.getElementById('reservationForm');
    const closeReservation = document.getElementById('closeReservation');
    // Modificar el selector para excluir el botón de servicios y el botón de envío
    const buttons = document.querySelectorAll('.cta-button:not(#submitReservation):not(.secondary)');
    
    console.log('Botones encontrados:', buttons.length); // Debug

    // Añadir evento a todos los botones de reserva
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botón clickeado'); // Debug
            reservationModal.style.display = 'block';
        });
    });

    // Cerrar modal
    closeReservation.addEventListener('click', () => {
        reservationModal.style.display = 'none';
    });

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === reservationModal) {
            reservationModal.style.display = 'none';
        }
    });

    // Manejar envío del formulario
    document.getElementById('submitReservation').addEventListener('click', (e) => {
        console.log('Botón de envío clickeado');
        e.preventDefault();
        
        const nombrePersona = document.getElementById('nombrePersona').value.trim();
        const nombreMascota = document.getElementById('nombreMascota').value.trim();
        const servicio = document.getElementById('servicio').value;

        console.log('Valores del formulario:', { nombrePersona, nombreMascota, servicio });
        
        if (!nombrePersona || !nombreMascota || !servicio) {
            alert('Por favor complete todos los campos');
            return;
        }

        const mensaje = encodeURIComponent(
            `¡Hola! Quisiera agendar una cita:\n\n` +
            `Nombre: ${nombrePersona}\n` +
            `Mascota: ${nombreMascota}\n` +
            `Servicio: ${servicio}`
        );
        window.open(`https://wa.me/56942393592?text=${mensaje}`, '_blank');        reservationModal.style.display = 'none';        reservationForm.reset();
    });

    // When opening modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        document.body.classList.add('modal-open');
        modal.style.display = "block";
        // Ensure the hamburger menu is hidden and inactive
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    }

    // When closing modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        document.body.classList.remove('modal-open');
        modal.style.display = "none";
    }

    // Update event listeners for reservation modal
    document.querySelectorAll('.cta-button:not(.secondary)').forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.classList.contains('secondary')) {
                e.preventDefault();
                openModal('reservationModal');
            }
        });
    });

    document.getElementById('closeReservation').addEventListener('click', () => {
        closeModal('reservationModal');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
});
