// auth.js - JavaScript para manejar login y registro

// Función para mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁';
    }
}

// Función para manejar el login
async function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const loginData = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (data.success) {
            // Guardar token y datos del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            alert('¡Login exitoso!');
            console.log('Usuario logueado:', data.user);
            
            // Redireccionar a dashboard o página principal
            window.location.href = 'inicio.html';
            
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error en login:', error);
        alert('Error de conexión. Intenta de nuevo.');
    }
}

// Función para manejar el registro
async function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const registerData = {
        username: formData.get('username'),
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };

    try {
            const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)
        });

        const data = await response.json();

        if (data.success) {
            // Guardar token y datos del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            alert('¡Registro exitoso!');
            console.log('Usuario registrado:', data.user);
            
            // Redireccionar al login o dashboard
            window.location.href = 'login.html';
            
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error en registro:', error);
        alert('Error de conexión. Intenta de nuevo.');
    }
}

// Función para verificar si el usuario está logueado
function isLoggedIn() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
}

// Función para obtener datos del usuario logueado
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Función para logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Verificar autenticación al cargar páginas protegidas
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en una página que requiere autenticación
    const protectedPages = ['/dashboard', '/profile'];
    const currentPath = window.location.pathname;
    
    if (protectedPages.includes(currentPath) && !isLoggedIn()) {
        window.location.href = 'login.html';    }
    
    // Si ya está logueado y trata de acceder al login/registro, redireccionar
    if ((currentPath === '/login' || currentPath === '/register') && isLoggedIn()) {
        // window.location.href = '/dashboard';
    }
});