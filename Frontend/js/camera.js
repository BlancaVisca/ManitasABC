document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('camera-feed');
    const instructionText = document.getElementById('instruction-text');
    const letterImage = document.getElementById('letter-image');
    const statusMessage = document.getElementById('status-message');

    // Función para iniciar la cámara
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            statusMessage.textContent = "Cámara activada. ¡Muestra la seña!";
        } catch (error) {
            console.error("Error al acceder a la cámara: ", error);
            statusMessage.textContent = "Error: No se pudo acceder a la cámara.";
        }
    };

    // Función para determinar la letra y la imagen a mostrar
    const loadChallenge = () => {
        const selectedLetter = localStorage.getItem('selectedLetter');
        const userName = localStorage.getItem('userName');
        let currentChallengeLetter = '';

        if (selectedLetter) {
            // Si viene de la página del abecedario, toma la letra seleccionada
            currentChallengeLetter = selectedLetter;
            instructionText.textContent = `¡Haz la seña de la letra ${currentChallengeLetter}!`;
            localStorage.removeItem('selectedLetter'); 
        } else if (userName) {
            // Si viene de la página del nombre, toma la primera letra
            currentChallengeLetter = userName.charAt(0).toUpperCase();
            instructionText.textContent = `¡A deletrear tu nombre! Haz la seña de la letra ${currentChallengeLetter}.`;
        }

        // Muestra la imagen de la letra correspondiente
        if (currentChallengeLetter) {
            const imagePath = `../../assets/images/abecedario/${currentChallengeLetter.toLowerCase()}.png`;
            letterImage.src = imagePath;
            letterImage.style.display = 'block';
        } else {
            letterImage.style.display = 'none';
        }
    };

    startCamera();
    loadChallenge();
});