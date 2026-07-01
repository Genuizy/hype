document.addEventListener("DOMContentLoaded", () => {
    // --- AUTH SECURITY GATEKEEPER CHECK ---
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
        sessionStorage.setItem("hypet_auth_token", accessToken);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (!sessionStorage.getItem("hypet_auth_token") && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
        return;
    }

    // --- WORKSPACE NAV & DROPDOWN CONTROLLER ---
    const masterMenuBtn = document.getElementById("masterMenuBtn");
    const masterDropdown = document.getElementById("masterDropdown");
    const navButtons = document.querySelectorAll(".nav-view-btn");
    const workspaceViews = document.querySelectorAll(".workspace-view");

    if (masterMenuBtn) {
        masterMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            masterDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", () => masterDropdown.classList.add("hidden"));

        navButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetViewId = btn.getAttribute("data-target");
                
                workspaceViews.forEach(view => {
                    if (view.id === targetViewId) {
                        view.classList.remove("hidden");
                        view.classList.add("active-view");
                    } else {
                        view.classList.add("hidden");
                        view.classList.remove("active-view");
                    }
                });
                masterDropdown.classList.add("hidden");
            });
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = "index.html";
        });
    }

    // --- ACCESSIBILITY & THEME MATRIX ENGINE ---
    const themeSelect = document.getElementById("themeSelect");
    const fontScaleSelect = document.getElementById("fontScaleSelect");

    if (themeSelect) {
        themeSelect.addEventListener("change", (e) => {
            document.body.className = "dashboard-page"; 
            if (e.target.value !== "glass-dark") document.body.classList.add(e.target.value);
            if (fontScaleSelect.value === "accessible") document.body.classList.add("accessible-font");
            localStorage.setItem("hypet_theme", e.target.value);
        });
    }

    if (fontScaleSelect) {
        fontScaleSelect.addEventListener("change", (e) => {
            if (e.target.value === "accessible") {
                document.body.classList.add("accessible-font");
            } else {
                document.body.classList.remove("accessible-font");
            }
            localStorage.setItem("hypet_font", e.target.value);
        });
    }

    // --- HIGH COMFORT ENCRYPTED JOURNAL CORE ---
    let activeSessionKey = null;
    const unlockJournalBtn = document.getElementById("unlockJournalBtn");
    const journalPassphraseInput = document.getElementById("journalPassphrase");
    const cryptoKeyZone = document.getElementById("cryptoKeyZone");
    const journalAppContent = document.getElementById("journalAppContent");
    const saveJournalBtn = document.getElementById("saveJournalBtn");
    const journalInput = document.getElementById("journalInput");
    const journalEntriesContainer = document.getElementById("journalEntries");

    if (unlockJournalBtn) {
        unlockJournalBtn.addEventListener("click", async () => {
            const secret = journalPassphraseInput.value;
            if (!secret) return alert("A password string is required to instantiate keys.");
            activeSessionKey = secret;
            
            cryptoKeyZone.classList.add("hidden");
            journalAppContent.classList.remove("hidden");
            renderJournalEntries();
        });

        saveJournalBtn.addEventListener("click", async () => {
            const content = journalInput.value.trim();
            if (!content) return;

            const encryptedString = await CryptoEngine.encryptData(content, activeSessionKey);
            const rawLogs = JSON.parse(localStorage.getItem("hypet_encrypted_logs") || "[]");
            
            rawLogs.push({
                timestamp: new Date().toISOString(),
                payload: encryptedString
            });

            localStorage.setItem("hypet_encrypted_logs", JSON.stringify(rawLogs));
            journalInput.value = "";
            renderJournalEntries();
        });
    }

    async function renderJournalEntries() {
        journalEntriesContainer.innerHTML = "";
        const rawLogs = JSON.parse(localStorage.getItem("hypet_encrypted_logs") || "[]");

        for (let entry of rawLogs) {
            const div = document.createElement("div");
            div.className = "journal-entry-card";
            
            try {
                const decryptedText = await CryptoEngine.decryptData(entry.payload, activeSessionKey);
                div.innerHTML = `<small>${new Date(entry.timestamp).toLocaleString()}</small><p>${decryptedText}</p>`;
            } catch (err) {
                div.innerHTML = `<small>${new Date(entry.timestamp).toLocaleString()}</small><p style="color:red; font-style:italic;">[Encrypted Data Blocks Payload Corrupted/Incorrect Key]</p>`;
            }
            journalEntriesContainer.appendChild(div);
        }
    }

    // --- LEDGER / BUDGET LOGIC ---
    const budgetForm = document.getElementById("budgetForm");
    if (budgetForm) {
        budgetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const desc = document.getElementById("budgetDesc").value;
            const amt = parseFloat(document.getElementById("budgetAmount").value);

            const transactions = JSON.parse(localStorage.getItem("hypet_budget") || "[]");
            transactions.push({ desc, amt });
            localStorage.setItem("hypet_budget", JSON.stringify(transactions));
            
            budgetForm.reset();
            renderBudget();
        });
    }

    function renderBudget() {
        const list = document.getElementById("budgetList");
        const balance = document.getElementById("freeBalance");
        if (!list) return;

        const transactions = JSON.parse(localStorage.getItem("hypet_budget") || "[]");
        list.innerHTML = "";
        let total = 0;

        transactions.forEach(t => {
            total += t.amt;
            const li = document.createElement("li");
            li.textContent = `${t.desc}: ${t.amt >= 0 ? '+' : ''}$${t.amt.toFixed(2)}`;
            list.appendChild(li);
        });
        balance.textContent = `$${total.toFixed(2)}`;
    }
    renderBudget();
});
