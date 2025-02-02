let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre == "") {
        alert("Ingresa un nombre");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Amigo ya está en la lista");
        return;
    }
    amigos.push(nombre);
    actualizarListaAmigos();

    input.value = "";
    input.focus();  // Asegura que el input reciba el foco después de agregar
}

// Agregar evento para detectar la tecla Enter
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevenir el comportamiento predeterminado
        agregarAmigo(); // Llama a la función al presionar Enter
    }
});

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpiar la lista

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        // Botón para eliminar un nombre
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "❌";
        btnEliminar.setAttribute('aria-label', `Eliminar a ${amigo}`);
        btnEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(btnEliminar);
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para sortear.");
        return;
    }

    // Crear un mapeo aleatorio
    const shuffled = [...amigos].sort(() => Math.random() - 0.5);
    const resultado = amigos.map((amigo, index) => ({
        amigo,
        amigoSecreto: shuffled[index]
    }));

    // Evitar que alguien sea su propio amigo secreto
    while (resultado.some(pair => pair.amigo === pair.amigoSecreto)) {
        shuffled.sort(() => Math.random() - 0.5);
        resultado.forEach((pair, index) => {
            pair.amigoSecreto = shuffled[index];
        });
    }

    // Mostrar el resultado en el DOM
    mostrarResultado(resultado);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(resultado) {
    const resultadoUl = document.getElementById('resultado');
    resultadoUl.innerHTML = ""; // Limpiar resultados previos

    resultado.forEach(pair => {
        const li = document.createElement('li');
        li.textContent = `${pair.amigo} → ${pair.amigoSecreto}`;
        resultadoUl.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar el elemento
    actualizarListaAmigos(); // Actualizar la lista en el DOM
}
