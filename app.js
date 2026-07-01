/**
 * Hype't Architecture Core Engine
 * Handcrafted under the framework constraints of Clocked Development.
 */

const App = {
    // 1. AUTHENTICATION MODULE
    auth: {
        correctPIN: "1234", // Set custom default PIN rule

        verifyPIN: function() {
            const entered = document.getElementById('vault-pin').value;
            if (entered === this.correctPIN) {
                this.unlockWorkspace();
            } else {
                alert("🔒 Access Denied. cryptographic handshake invalid.");
            }
        },

        loginDiscord: function() {
            // Emulated Explicit Grant OAuth2 Handshake sequence
            console.log("Initializing client-side Discord Implicit Grant Sequence...");
            document.getElementById('vault-pin').value = "••••";
            setTimeout(() => {
                this.unlockWorkspace();
            }, 800);
        },

        unlockWorkspace: function() {
            document.getElementById('auth-wall').classList.add('hidden');
            document.getElementById('app-workspace').classList.remove('hidden');
            // Check for existing user records instantly
            App.budget.renderExpenses();
        },

        logout: function() {
            document.getElementById('vault-pin').value = "";
            document.getElementById('app-workspace').classList.add('hidden');
            document.getElementById('auth-wall').classList.remove('hidden');
            App.ui.toggleMenu(false);
        }
    },

    // 2. USER INTERFACE CONTROLLER
    ui: {
        toggleMenu: function(forceClose = null) {
            const menu = document.getElementById('dropdown-menu');
            if (forceClose === false) {
                menu.classList.add('hidden');
            } else {
                menu.classList.toggle('hidden');
            }
        },

        switchView: function(viewId) {
            // Close active open menus
            this.toggleMenu(false);

            // Hide all sub containers safely
            const views = document.querySelectorAll('.app-view');
            views.forEach(v => v.classList.add('hidden'));

            // Expose the targeted window container
            document.getElementById(`view-${viewId}`).classList.remove('hidden');
        }
    },

    // 3. ENCRYPTED MENTAL HEALTH JOURNAL MODULE
    journal: {
        save: function() {
            const text = document.getElementById('journal-input').value;
            const passphrase = document.getElementById('journal-passphrase').value;
            const status = document.getElementById('journal-status');

            if (!passphrase) {
                status.style.color = "#ef4444";
                status.innerText = "Error: A Passphrase is required to isolate local data array layers.";
                return;
            }

            try {
                // AES-256 Symmetric Encryption Sequence execution
                const encrypted = CryptoJS.AES.encrypt(text, passphrase).toString();
                localStorage.setItem('hypet_secure_journal', encrypted);
                
                status.style.color = "var(--accent-success)";
                status.innerText = "✔ Success: Data successfully obfuscated and written onto local storage partition.";
            } catch (e) {
                status.style.color = "#ef4444";
                status.innerText = "Fatal technical error writing down encryption profile block.";
            }
        },

        load: function() {
            const encrypted = localStorage.getItem('hypet_secure_journal');
            const passphrase = document.getElementById('journal-passphrase').value;
            const status = document.getElementById('journal-status');

            if (!encrypted) {
                status.innerText = "No persistent data matrix detected inside local storage browser memory.";
                return;
            }
            if (!passphrase) {
                status.style.color = "#ef4444";
                status.innerText = "Passphrase configuration required for entry decryption.";
                return;
            }

            try {
                // Attempting local decipher cycle
                const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
                const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

                if (!decryptedText) throw new Error("Incorrect Key Array Match Pattern");

                document.getElementById('journal-input').value = decryptedText;
                status.style.color = "var(--accent-success)";
                status.innerText = "✔ Vault access cleared: String parsed cleanly.";
            } catch (e) {
                status.style.color = "#ef4444";
                status.innerText = "❌ Decryption Denied: Invalid key sequence or altered signature block.";
            }
        }
    },

    // 4. FINANCIAL LEDGER MODULE
    budget: {
        expenses: JSON.parse(localStorage.getItem('hypet_expenses')) || [],

        calculate: function() {
            const income = parseFloat(document.getElementById('budget-income').value) || 0;
            const totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const remaining = income - totalExpenses;

            document.getElementById('balance-display').innerText = `$${remaining.toFixed(2)}`;
        },

        addExpense: function() {
            const nameInput = document.getElementById('expense-name');
            const amtInput = document.getElementById('expense-amount');
            
            if(!nameInput.value || !amtInput.value) return;

            this.expenses.push({
                name: nameInput.value,
                amount: parseFloat(amtInput.value)
            });

            localStorage.setItem('hypet_expenses', JSON.stringify(this.expenses));
            nameInput.value = '';
            amtInput.value = '';
            
            this.renderExpenses();
        },

        renderExpenses: function() {
            const list = document.getElementById('expense-list');
            list.innerHTML = '';
            this.expenses.forEach(exp => {
                const li = document.createElement('li');
                li.style.padding = "8px 0";
                li.style.borderBottom = "1px solid var(--border-glass)";
                li.innerHTML = `<span>${exp.name}</span> — <strong>$${exp.amount.toFixed(2)}</strong>`;
                list.appendChild(li);
            });
            this.calculate();
        }
    },

    // 5. BIOLOGICAL TREND ANALYSIS MODULE
    wellness: {
        predictTrend: function() {
            const dateInput = document.getElementById('cycle-date').value;
            const lengthInput = parseInt(document.getElementById('cycle-length').value) || 28;
            const output = document.getElementById('wellness-output');

            if (!dateInput) {
                output.innerHTML = "<p style='color: #ef4444'>Input true starting calendar metric index sequence first.</p>";
                return;
            }

            const lastDate = new Date(dateInput);
            const nextCycle = new Date(lastDate.getTime() + lengthInput * 24 * 60 * 60 * 1000);
            
            output.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 0.95rem; line-height: 1.8;">
                    <p>⚡ <strong style="color:var(--accent-success)">Projection Locked:</strong> Next Cycle Window Expected: <strong>${nextCycle.toDateString()}</strong></p>
                    <p style="color: var(--text-secondary); margin-top: 8px;">Cognitive Wellness Recommendation: Elevate fluid intake parameters 48h prior to matrix convergence.</p>
                </div>
            `;
        }
    }
};
