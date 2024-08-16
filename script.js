document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aquí puedes integrar Firebase Auth o cualquier servicio de autenticación
    console.log('Email:', email);
    console.log('Password:', password);

    alert('Login successful!');
});
