const premios = [
    "Tableta Android",
    "Auriculares Inalámbricos",
    "Tarjeta de Regalo",
    "Descuento Exclusivo",
    "Smartwatch",
    "Cámara Digital"
];

const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
let anguloInicio = 0;
const numPremios = premios.length;
const anguloPorPremio = 2 * Math.PI / numPremios;
const logo = new Image();
logo.src = 'ruta/a/tu/logo.png'; // Reemplaza con la ruta a tu logo

logo.onload = () => {
    dibujarRuleta();
};

function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numPremios; i++) {
        const angulo = anguloInicio + i * anguloPorPremio;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angulo, angulo + anguloPorPremio);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFC1DD';
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width / 2 + Math.cos(angulo + anguloPorPremio / 2) * canvas.width / 2.5, canvas.height / 2 + Math.sin(angulo + anguloPorPremio / 2) * canvas.height / 2.5);
        ctx.rotate(angulo + anguloPorPremio / 2 + Math.PI / 2);
        ctx.fillStyle = '#000';
        ctx.fillText(premios[i], -ctx.measureText(premios[i]).width / 2, 0);
        ctx.restore();
    }
    ctx.drawImage(logo, (canvas.width - 100) / 2, (canvas.height - 100) / 2, 100, 100); // Ajusta el tamaño y posición del logo
}

function girarRuleta() {
    const anguloGiro = Math.random() * 360 + 720; // Giro entre 720 y 1080 grados
    const duracion = 5000; // Duración del giro en milisegundos
    const inicio = performance.now();

    function animarGiro(timestamp) {
        const tiempoTranscurrido = timestamp - inicio;
        const fraccion = Math.min(tiempoTranscurrido / duracion, 1);
        const anguloActual = anguloInicio + fraccion * anguloGiro * Math.PI / 180;
        anguloInicio = anguloActual % (2 * Math.PI);
        dibujarRuleta();
        if (fraccion < 1) {
            requestAnimationFrame(animarGiro);
        }
    }

    requestAnimationFrame(animarGiro);
}

girarBtn.addEventListener('click', girarRuleta);
