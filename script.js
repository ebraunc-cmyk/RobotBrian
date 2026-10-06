// COLOCA TU API KEY DE GOOGLE AI STUDIO AQUÍ (REEMPLAZA LAS COMILLAS):
const GEMINI_API_KEY = "TU_CLAVE_AQ_AQUÍ"; 

const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

sendBtn.addEventListener('click', async () => {
    const promptText = textInput.value.trim();

    if (GEMINI_API_KEY === "TU_CLAVE_AQ_AQUÍ" || GEMINI_API_KEY.trim() === "") {
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
