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
            
            // Visual feedback
            copyBtn.style.opacity = '0.5';
            setTimeout(() => {
                copyBtn.style.opacity = '1';
            }, 200);
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