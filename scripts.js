$('#diagnosticoForm').on('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario y aplicar ponderaciones
    var total = 0;
    total += parseInt($('#pregunta1').val()) * 2; // Síntoma principal
    total += parseInt($('#pregunta2').val()) * 2; // Síntoma principal
    total += parseInt($('#pregunta8').val()) * 2; // Síntoma principal
    total += parseInt($('#pregunta3').val()) * 1; // Síntoma secundario
    total += parseInt($('#pregunta4').val()) * 1; // Síntoma secundario
    total += parseInt($('#pregunta5').val()) * 1; // Síntoma secundario
    total += parseInt($('#pregunta6').val()) * 1; // Síntoma secundario
    total += parseInt($('#pregunta7').val()) * 1; // Síntoma secundario
    total += parseInt($('#pregunta9').val()) * 0.5; // Factor asociado

    // Modelo basado en reglas reformulado
    var mensaje, icono;
    if (total >= 8) { // Ajustar el umbral según los pesos
        mensaje = 'Es posible que esté experimentando síntomas significativos de depresión. Por favor, consulte a un profesional de la salud.';
        icono = 'warning';
    } else if (total >= 5 && total < 8) {
        mensaje = 'Presenta algunos síntomas de depresión. Se recomienda observar su estado y, de ser necesario, buscar orientación médica.';
        icono = 'info';
    } else {
        mensaje = 'Es poco probable que esté experimentando depresión.';
        icono = 'success';
    }

  // Mostrar resultado
  Swal.fire({
    title: 'Resultado',
    text: mensaje,
    icon: icono,
    confirmButtonText: 'Aceptar'
    });
});



// Alertas interactivas para WhatsApp flotante
// Alertas interactivas para WhatsApp flotante
document.querySelector('.whatsapp-float').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la redirección inmediata

    let timerInterval;
    Swal.fire({
        icon: 'info',
        title: '¡Gracias por tu interés!',
        html: 'Serás redirigido a WhatsApp en <b></b> segundos.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.open('https://wa.me/573229608830', '_blank');
        }
    });

});

// Alertas interactivas para los íconos flotantes
document.querySelectorAll('.social-icon').forEach(function(icon) {
    icon.addEventListener('click', function(event) {
        event.preventDefault(); // Evita la redirección inmediata

        let iconText = icon.querySelector('i').classList[1];
        let iconTitle = '';

        if (iconText === 'fa-github') {
            iconTitle = 'GitHub';
        } else if (iconText === 'fa-linkedin') {
            iconTitle = 'LinkedIn';
        } else if (iconText === 'fa-phone') {
            iconTitle = 'Teléfono';
        } else if (iconText === 'fa-envelope') {
            iconTitle = 'Correo Electrónico';
        }

        Swal.fire({
            icon: 'success',
            title: '¡Gracias por tu interés!',
            text: `Serás redirigido a mi perfil de ${iconTitle}.`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(icon.href, '_blank');
            }
        });
    });
});