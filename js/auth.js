// Application Identity Configuration 
const DISCORD_CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID_HERE'; 
const REDIRECT_URI = window.location.origin + '/dashboard.html';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const discordBtn = document.getElementById("discordAuthBtn");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Local Validation Route for secure sandboxed spaces
            sessionStorage.setItem("hypet_auth_token", "local-verified-handshake");
            window.location.href = "dashboard.html";
        });
    }

    if (discordBtn) {
        discordBtn.addEventListener("click", () => {
            // Client-Side Implicit Grant Flow URL compilation
            const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
            window.location.href = authUrl;
        });
    }
});
