(function() {
    'use strict';

    // Character sets for password generation
    const CHAR_SETS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Combine all character sets
    const ALL_CHARS = Object.values(CHAR_SETS).join('');

    // Default password length
    const PASSWORD_LENGTH = 12;

    // DOM Elements
    const passwordField = document.getElementById('password');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    /**
     * Generate a cryptographically secure random number
     * @param {number} max - Maximum value (exclusive)
     * @returns {number} Random number between 0 and max
     */
    function getSecureRandomNumber(max) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % max;
    }

    /**
     * Generate a secure random password
     * @param {number} length - Password length
     * @returns {string} Generated password
     */
    function generatePassword(length = PASSWORD_LENGTH) {
        let password = '';
        
        // Ensure at least one character from each set
        password += CHAR_SETS.uppercase[getSecureRandomNumber(CHAR_SETS.uppercase.length)];
        password += CHAR_SETS.lowercase[getSecureRandomNumber(CHAR_SETS.lowercase.length)];
        password += CHAR_SETS.numbers[getSecureRandomNumber(CHAR_SETS.numbers.length)];
        password += CHAR_SETS.symbols[getSecureRandomNumber(CHAR_SETS.symbols.length)];

        // Fill remaining length with random characters
        for (let i = password.length; i < length; i++) {
            password += ALL_CHARS[getSecureRandomNumber(ALL_CHARS.length)];
        }

        // Shuffle the password to randomize character positions
        return shuffleString(password);
    }

    /**
     * Shuffle a string using Fisher-Yates algorithm
     * @param {string} str - String to shuffle
     * @returns {string} Shuffled string
     */
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = getSecureRandomNumber(i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    /**
     * Copy password to clipboard
     */
    async function copyToClipboard() {
        const password = passwordField.value;
        
        if (!password) {
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            
            // Visual feedback - change icon to checkmark
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy password:', err);
        }
    }

    /**
     * Initialize the application
     */
    function init() {
        // Generate initial password
        passwordField.value = generatePassword();

        // Event listeners
        generateBtn.addEventListener('click', () => {
            passwordField.value = generatePassword();
        });

        copyBtn.addEventListener('click', copyToClipboard);
    }

    // Start the application
    init();
})();