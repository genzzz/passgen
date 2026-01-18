import "./style.css";

// ============================================================================
// Types
// ============================================================================

interface CharacterSets {
  uppercase: string;
  lowercase: string;
  numbers: string;
  symbols: string;
}

interface StrengthResult {
  level: "weak" | "fair" | "good" | "strong";
  label: string;
}

// ============================================================================
// Constants
// ============================================================================

const CHAR_SETS: CharacterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const ALL_CHARS: string = Object.values(CHAR_SETS).join("");

const DEFAULT_LENGTH = 12;

// ============================================================================
// DOM Elements
// ============================================================================

const passwordField = document.getElementById("password") as HTMLInputElement;
const generateBtn = document.getElementById(
  "generate-btn",
) as HTMLButtonElement;
const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement;
const lengthSlider = document.getElementById(
  "length-slider",
) as HTMLInputElement;
const lengthValue = document.getElementById("length-value") as HTMLSpanElement;
const strengthFill = document.getElementById("strength-fill") as HTMLDivElement;
const strengthLabel = document.getElementById(
  "strength-label",
) as HTMLSpanElement;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a cryptographically secure random number
 * @param max - Maximum value (exclusive)
 * @returns Random number between 0 and max
 */
function getSecureRandomNumber(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Shuffle a string using Fisher-Yates algorithm
 * @param str - String to shuffle
 * @returns Shuffled string
 */
function shuffleString(str: string): string {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = getSecureRandomNumber(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

// ============================================================================
// Password Generation
// ============================================================================

/**
 * Generate a secure random password
 * @param length - Password length
 * @returns Generated password
 */
function generatePassword(length: number = DEFAULT_LENGTH): string {
  let password = "";

  // Ensure at least one character from each set (if length allows)
  if (length >= 4) {
    password +=
      CHAR_SETS.uppercase[getSecureRandomNumber(CHAR_SETS.uppercase.length)];
    password +=
      CHAR_SETS.lowercase[getSecureRandomNumber(CHAR_SETS.lowercase.length)];
    password +=
      CHAR_SETS.numbers[getSecureRandomNumber(CHAR_SETS.numbers.length)];
    password +=
      CHAR_SETS.symbols[getSecureRandomNumber(CHAR_SETS.symbols.length)];
  }

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += ALL_CHARS[getSecureRandomNumber(ALL_CHARS.length)];
  }

  // Shuffle the password to randomize character positions
  return shuffleString(password);
}

// ============================================================================
// Strength Calculation
// ============================================================================

/**
 * Calculate password strength
 * @param password - Password to evaluate
 * @returns Strength level and label
 */
function calculateStrength(password: string): StrengthResult {
  let score = 0;

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (password.length >= 24) score++;

  // Character variety scoring
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Determine strength level
  if (score <= 3) return { level: "weak", label: "Weak" };
  if (score <= 5) return { level: "fair", label: "Fair" };
  if (score <= 7) return { level: "good", label: "Good" };
  return { level: "strong", label: "Strong" };
}

// ============================================================================
// UI Updates
// ============================================================================

/**
 * Update strength indicator UI
 * @param password - Current password
 */
function updateStrengthIndicator(password: string): void {
  const strength = calculateStrength(password);

  // Update fill bar
  strengthFill.className = `strength-fill ${strength.level}`;

  // Update label
  strengthLabel.textContent = strength.label;
  strengthLabel.className = `strength-label ${strength.level}`;
}

/**
 * Update slider track progress
 */
function updateSliderProgress(): void {
  const min = parseInt(lengthSlider.min, 10);
  const max = parseInt(lengthSlider.max, 10);
  const value = parseInt(lengthSlider.value, 10);
  const progress = ((value - min) / (max - min)) * 100;
  lengthSlider.style.setProperty("--slider-progress", `${progress}%`);
}

/**
 * Copy password to clipboard
 */
async function copyToClipboard(): Promise<void> {
  const password = passwordField.value;

  if (!password) {
    return;
  }

  try {
    await navigator.clipboard.writeText(password);

    // Visual feedback - change icon to checkmark
    copyBtn.classList.add("copied");
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
    }, 1500);
  } catch (err) {
    console.error("Failed to copy password:", err);
  }
}

// ============================================================================
// Main Application
// ============================================================================

/**
 * Generate and display a new password
 */
function generateAndDisplay(): void {
  const length = parseInt(lengthSlider.value, 10);
  const password = generatePassword(length);
  passwordField.value = password;
  updateStrengthIndicator(password);
}

/**
 * Initialize the application
 */
function init(): void {
  // Set initial slider progress
  updateSliderProgress();

  // Generate initial password
  generateAndDisplay();

  // Event listeners
  generateBtn.addEventListener("click", generateAndDisplay);

  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    updateSliderProgress();
    generateAndDisplay();
  });

  copyBtn.addEventListener("click", copyToClipboard);
}

// Start the application
init();
