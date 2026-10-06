// PEGA TU CLAVE COMPLETA DE GEMINI AQUÍ (LA QUE EMPIEZA CON AQ):
const GEMINI_API_KEY = "AQ.Ab8RN6JT76gEeqaNCDA3WDZuLQrdJ1K0FIPlmvKKYXYi9CIxFw"; 

const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

sendBtn.addEventListener('click', async () => {
    const promptText = textInput.value.trim();

    if (!promptText) {
        alert("Por favor, escribe un mensaje.");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Pensando...";
    responseArea.innerHTML = `<div class="placeholder-text" style="color: var(--primary)">Gemini está respondiendo...</div>`;

    try {
        // Inicializamos la librería oficial de Google usando el objeto global cargado en el HTML
        const ai = new window.GoogleGenerativeAI.GoogleGenerativeAI(GEMINI_API_KEY);
        
        // Seleccionamos el modelo actual recomendado
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Enviamos el mensaje
        const result = await model.generateContent(promptText);
        const response = await result.response;
        const reply = response.text();

        // Ponemos la respuesta directamente en tu pantalla
        responseArea.textContent = reply;

    } catch (error) {
        console.error(error);
        responseArea.innerHTML = `
            <div style="color: var(--danger); font-weight: bold;">Error en la solicitud.</div>
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 5px;">
                ${error.message || 'Verifica que tu clave AQ sea válida y no tenga espacios.'}
            </div>
        `;
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar a Gemini";
        textInput.value = ""; 
    }
});
