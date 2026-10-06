// REEMPLAZA ÚNICAMENTE LO QUE ESTÁ ENTRE LAS COMILLAS CON TU CLAVE AQ REAL:
const GEMINI_API_KEY = "AQ..."; 

const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

sendBtn.addEventListener('click', async () => {
    const promptText = textInput.value.trim();

    if (!promptText) {
        alert("Por favor, escribe un mensaje en el cuadro de texto.");
        return;
    }

    // Configurar interfaz en estado de carga
    sendBtn.disabled = true;
    sendBtn.textContent = "Pensando...";
    responseArea.innerHTML = `<div class="placeholder-text" style="color: var(--primary)">Gemini está respondiendo...</div>`;

    // Cuerpo JSON plano exigido por la API de Google
    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: promptText
                    }
                ]
            }
        ]
    };

    // URL oficial v1beta para conectar claves Auth Keys (AQ) en producción
    const url = `https://googleapis.com{GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            // SINTAXIS BLINDADA: Acceso por corchetes e índices numéricos para evitar que JavaScript se congele
            if (data && data['candidates'] && data['candidates'][0] && data['candidates'][0]['content'] && data['candidates'][0]['content']['parts']) {
                const reply = data['candidates'][0]['content']['parts'][0]['text'];
                responseArea.textContent = reply; // Despliega la respuesta de la IA en pantalla
            } else {
                responseArea.innerHTML = `<div style="color: var(--danger)">Error: Google devolvió una estructura vacía. Revisa la consola.</div>`;
            }
        } else {
            // Si la clave AQ copiada es inválida, Google nos escribirá el porqué en letras rojas
            const errorMsg = data.error ? data.error.message : 'Error desconocido';
            responseArea.innerHTML = `<div style="color: var(--danger); font-weight:bold;">Error de la API: ${errorMsg}</div>`;
        }

    } catch (error) {
        console.error(error);
        responseArea.innerHTML = `<div style="color: var(--danger)">Error de red. Asegúrate de actualizar la pestaña.</div>`;
    } finally {
        // Restaurar botón para una nueva pregunta
        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar a Gemini";
        textInput.value = ""; 
    }
});
