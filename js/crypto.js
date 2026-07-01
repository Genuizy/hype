/**
 * Hype't Web Crypto API Framework
 * AES-GCM Local Data Encryption Engine
 */
const CryptoEngine = {
    // Generate functional cryptographic keys directly from passphrases
    async deriveKey(passphrase, salt) {
        const encoder = new TextEncoder();
        const baseKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(passphrase),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            baseKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    },

    async encryptData(plaintext, passphrase) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(passphrase, salt);

        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encoder.encode(plaintext)
        );

        // Combine salt, iv and ciphertext into a portable transport format
        const result = new Uint8Array(salt.byteLength + iv.byteLength + encrypted.byteLength);
        result.set(salt, 0);
        result.set(iv, salt.byteLength);
        result.set(new Uint8Array(encrypted), salt.byteLength + iv.byteLength);

        return btoa(String.fromCharCode.apply(null, result));
    },

    async decryptData(ciphertextBase64, passphrase) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        const binaryStr = atob(ciphertextBase64);
        const data = new Uint8Array(binaryStr.length).map((_, i) => binaryStr.charCodeAt(i));

        const salt = data.slice(0, 16);
        const iv = data.slice(16, 28);
        const encrypted = data.slice(28);

        const key = await this.deriveKey(passphrase, salt);

        try {
            const decrypted = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: iv },
                key,
                encrypted
            );
            return decoder.decode(decrypted);
        } catch (e) {
            throw new Error("Decryption failure. Invalid cryptographic signature.");
        }
    }
};
