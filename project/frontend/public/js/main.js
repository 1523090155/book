function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.userId) {
            localStorage.setItem('userId', data.userId);
            document.getElementById('loginBox').classList.add('hidden');
            document.getElementById('bookmarkSection').classList.remove('hidden');
        } else {
            alert(data.error);
        }
    })
    .catch(err => console.error(err));
}

function logout() {
    localStorage.removeItem('userId');
    document.getElementById('loginBox').classList.remove('hidden');
    document.getElementById('bookmarkSection').classList.add('hidden');
}
