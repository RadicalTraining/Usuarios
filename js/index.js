import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEXoRtBYglvzgpmedWnMLK_8LUtlcfpdw",
    authDomain: "mensualidadesradicaltraining.firebaseapp.com",
    projectId: "mensualidadesradicaltraining",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.consultar = async function () {
    // Cambiado de "cedula" a "telefono"
    const telefono = document.getElementById("telefono").value.trim();
    const resultado = document.getElementById("resultado");

    if (!telefono) {
        resultado.innerText = "Por favor ingresa tu número de teléfono.";
        return;
    }

    // Cambiado para buscar por el ID del documento (que ahora es el número de teléfono)
    const ref = doc(db, "clientes", telefono);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        resultado.innerText = "❌ No se encontró tu registro. Verifica el número de teléfono.";
        return;
    }

    const data = snap.data();
    const hoy = new Date();
    const vencimiento = new Date(data.fechaVencimiento);

    const diffMs = vencimiento - hoy;
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias > 0) {
        resultado.innerText = `✅ Tu membresía vence en ${diffDias} día(s): ${data.fechaVencimiento}`;
    } else if (diffDias === 0) {
        resultado.innerText = `⚠️ Tu membresía vence HOY: ${data.fechaVencimiento}`;
    } else {
        resultado.innerText = `❌ Tu membresía está vencida desde el ${data.fechaVencimiento}`;
    }
};