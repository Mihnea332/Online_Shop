// Logica pentru EmailJS și Formular
(function() {
    // Înlocuiește cu ID-ul tău de la EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_USER_ID");
    }
})();

const contactForm = document.getElementById('formular-contact');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const btn = this.querySelector('button');
        btn.innerText = 'Se trimite... ⏳';

        emailjs.sendForm('service_id', 'template_id', this)
            .then(() => {
                alert('Mesaj trimis!');
                this.reset();
                btn.innerText = 'Trimite mesajul ✉️';
            }, (error) => {
                alert('Eroare!');
                btn.innerText = 'Eroare';
            });
    });
}