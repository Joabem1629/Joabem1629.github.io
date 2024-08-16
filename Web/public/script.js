document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/login"]');
    const subscribeForm = document.querySelector('form[action="/subscribe"]');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            fetch('/login', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(result => {
                document.body.innerHTML = result;
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(subscribeForm);
            fetch('/subscribe', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
