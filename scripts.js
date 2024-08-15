// scripts.js

document.getElementById('form-suscripcion').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if(email) {
        alert(`Gracias por suscribirte con el correo: ${email}`);
        // Aquí podrías añadir código para enviar el email a tu base de datos o servicio de mailing
    }
});

// Ejemplo de cómo cargar publicaciones dinámicamente
let publicaciones = [
    {
        titulo: "Mi Primera Publicación",
        contenido: "Este es un ejemplo de una publicación en Markdown. Puedes editar esta parte para que funcione con tus publicaciones reales.",
        fecha: "2024-08-15"
    },
    {
        titulo: "Aprendiendo a Crear Interfaces Gráficas",
        contenido: "Aquí hablo sobre cómo estoy aprendiendo a crear interfaces gráficas utilizando Python y otras herramientas.",
        fecha: "2024-08-10"
    }
];

function cargarPublicaciones() {
    let contenedor = document.getElementById('blog-posts');
    publicaciones.forEach(post => {
        let postElemento = document.createElement('div');
        postElemento.classList.add('post');

        let titulo = document.createElement('h3');
        titulo.innerText = post.titulo;
        postElemento.appendChild(titulo);

        let contenido = document.createElement('p');
        contenido.innerText = post.contenido;
        postElemento.appendChild(contenido);

        let fecha = document.createElement('span');
        fecha.innerText = `Publicado el: ${post.fecha}`;
        postElemento.appendChild(fecha);

        contenedor.appendChild(postElemento);
    });
}

window.onload = cargarPublicaciones;
