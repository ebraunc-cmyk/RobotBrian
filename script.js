// COLOCA TU API KEY DE GOOGLE AI STUDIO AQUÍ (REEMPLAZA LAS COMILLAS):
const GEMINI// COLOCA TU API KEY DE GOOGLE AI STUDIO AQUÍ (MANTÉN LAS COMILLAS):
const GEMINI_API_KEY = "AQ..."; 

const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

sendBtn.addEventListener('click', async () => {
    const promptText = textInput.value.trim();

    // Validación simplificada: solo revisa que el usuario haya escrito un mensaje abajo
    if (!promptText) {
        alert("El cuadro de texto está vacío. Escribe una consulta.");
        return;
    }

    // Configurar la interfaz en estado de carga
    sendBtn.disabled = true;
    sendBtn.textContent = "Pensando...";
    responseArea.innerHTML = `<div class="placeholder-text" style="color: var(--primary)">Gemini está respondiendo...</div>`;

    // Estructura JSON para el modelo Gemini 2.5 Flash
    const payload = {
        contents: [{
            parts: [{
                text: promptText
            }]
        }]
    };

    // URL oficial estable para peticiones HTTPS seguras desde servidores en la nube como GitHub
    const url = `https://googleapis.com{GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            // Extraer el texto de la estructura oficial de Google
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                const reply = data.candidates[0].content.parts[0].text;
                responseArea.textContent = reply; 
            } else {
                responseArea.innerHTML = `<div style="color: var(--danger)">Estructura de datos inesperada.</div>`;
            }
        } else {
            // Si la clave AQ es incorrecta o está mal copiada, Google nos lo dirá aquí en letras rojas
            const errorMsg = data.error ? data.error.message : 'Error desconocido';
            responseArea.innerHTML = `<div style="color: var(--danger); font-weight:bold;">Error de la API: ${errorMsg}</div>`;
        }

    } catch (error) {
        console.error(error);
        responseArea.innerHTML = `<div style="color: var(--danger)">Error de servidor. Revisa tu conexión.</div>`;
    } finally {
        // Restaurar estado del botón
        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar a Gemini";
        textInput.value = ""; 
    }
});
_API_KEY = "AQ.Ab8RN6Lvs2j9j3N7mBiV3bTglbSQoZQRg5gj2aKTkFhttZzm6A"; 

const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

sendBtn.addEventListener('click', async () => {
    const promptText = textInput.value.trim();

    if (GEMINI_API_KEY === "AQ.Ab8RN6Lvs2j9j3N7mBiV3bTglbSQoZQRg5gj2aKTkFhttZzm6A" || GEMINI_API_KEY.trim() === "") {
        alert("Por favor, introduce tu API Key real en la línea 2 del archivo script.js");
        return;
    }
    if (!promptText) {
        alert("Por favor, introduce una consulta.");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Pensando...";
    responseArea.innerHTML = `<div class="placeholder-text" style="color: var(--primary)">Gemini está respondiendo...</div>`;

    // Estructura limpia para la pasarela OpenAI integrada en Gemini
    const payload = {
        model: "gemini-2.5-flash",
        messages: [
            {
                role: "user",
                content: promptText
            }
        ]
    };

    // Usamos el endpoint oficial con soporte de cabeceras CORS desbloqueadas para localhost
    const url = "https://googleapis.com";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const reply = data.choices[0].message.content;
                responseArea.textContent = reply; 
            } else {
                responseArea.innerHTML = `<div style="color: var(--danger)">Estructura de datos inesperada.</div>`;
            }
        } else {
            const errorMsg = data.error ? data.error.message : 'Error desconocido';
            responseArea.innerHTML = `<div style="color: var(--danger); font-weight:bold;">Error de la API: ${errorMsg}</div>`;
        }

    } catch (error) {
        console.error("Detalles del fallo técnico:", error);
        responseArea.innerHTML = `<div style="color: var(--danger)">Error de conexión. Asegúrate de ejecutar el comando 'live-server' en tu terminal.</div>`;
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar a Gemini";
        textInput.value = ""; 
    }
});
