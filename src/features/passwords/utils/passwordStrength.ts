/**
 * Password Strength Calculator Utility
 * 
 * This utility calculates the strength of a password based on:
 * - Length
 * - Character variety (uppercase, lowercase, numbers, symbols)
 * - Common patterns
 */

import { StrengthLevel, PasswordStrength } from '../types';

/**
 * Calculate password strength score (0-100)
 * @param password - The password to evaluate
 * @returns Strength score from 0 to 100
 */
function calculateScore(password: string): number {
  let score = 0;

  if (!password) return 0;

  // Length score (max 40 points)
  const length = password.length;
  if (length >= 8) score += 10;
  if (length >= 12) score += 10;
  if (length >= 16) score += 10;
  if (length >= 20) score += 10;

  // Character variety (max 40 points)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  if (hasLowercase) score += 10;
  if (hasUppercase) score += 10;
  if (hasNumbers) score += 10;
  if (hasSymbols) score += 10;

  // Additional points for variety combination (max 20 points)
  const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols]
    .filter(Boolean).length;
  
  if (varietyCount === 2) score += 5;
  if (varietyCount === 3) score += 10;
  if (varietyCount === 4) score += 20;

  // Penalty for common patterns
  if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters (aaa, 111)
  if (/^[0-9]+$/.test(password)) score -= 20; // Only numbers
  if (/^[a-zA-Z]+$/.test(password)) score -= 10; // Only letters
  if (/123|234|345|456|567|678|789|890/.test(password)) score -= 10; // Sequential numbers
  if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
    score -= 10; // Sequential letters
  }

  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Determine strength level from score
 * @param score - Password score (0-100)
 * @returns Strength level enum
 */
function getStrengthLevel(score: number): StrengthLevel {
  if (score < 20) return StrengthLevel.WEAK;
  if (score < 40) return StrengthLevel.FAIR;
  if (score < 60) return StrengthLevel.GOOD;
  if (score < 80) return StrengthLevel.STRONG;
  return StrengthLevel.VERY_STRONG;
}

/**
 * Get color for password strength level
 * @param level - Strength level
 * @returns MUI color string
 */
export function getPasswordStrengthColor(level: StrengthLevel): string {
  switch (level) {
    case StrengthLevel.WEAK:
      return '#f44336'; // Red
    case StrengthLevel.FAIR:
      return '#ff9800'; // Orange
    case StrengthLevel.GOOD:
      return '#ffc107'; // Amber
    case StrengthLevel.STRONG:
      return '#4caf50'; // Green
    case StrengthLevel.VERY_STRONG:
      return '#2e7d32'; // Dark Green
    default:
      return '#9e9e9e'; // Grey
  }
}

/**
 * Get localized text for password strength level
 * @param level - Strength level
 * @returns Localized strength text
 */
export function getPasswordStrengthText(level: StrengthLevel): string {
  switch (level) {
    case StrengthLevel.WEAK:
      return 'Слабый';
    case StrengthLevel.FAIR:
      return 'Удовлетворительный';
    case StrengthLevel.GOOD:
      return 'Хороший';
    case StrengthLevel.STRONG:
      return 'Сильный';
    case StrengthLevel.VERY_STRONG:
      return 'Очень сильный';
    default:
      return 'Не определен';
  }
}

/**
 * Calculate full password strength with all details
 * @param password - The password to evaluate
 * @returns Complete password strength information
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  const score = calculateScore(password);
  const level = getStrengthLevel(score);
  const color = getPasswordStrengthColor(level);
  const text = getPasswordStrengthText(level);

  return {
    level,
    score,
    color,
    text,
  };
}

/**
 * Generate password strength recommendations
 * @param password - The password to evaluate
 * @returns Array of recommendation strings
 */
export function getPasswordRecommendations(password: string): string[] {
  const recommendations: string[] = [];

  if (!password) {
    recommendations.push('Введите пароль');
    return recommendations;
  }

  if (password.length < 8) {
    recommendations.push('Используйте минимум 8 символов');
  }

  if (!/[a-z]/.test(password)) {
    recommendations.push('Добавьте строчные буквы (a-z)');
  }

  if (!/[A-Z]/.test(password)) {
    recommendations.push('Добавьте заглавные буквы (A-Z)');
  }

  if (!/\d/.test(password)) {
    recommendations.push('Добавьте цифры (0-9)');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    recommendations.push('Добавьте специальные символы (!@#$%^&*)');
  }

  if (/(.)\1{2,}/.test(password)) {
    recommendations.push('Избегайте повторяющихся символов');
  }

  if (/123|234|345|456|567|678|789|890/.test(password)) {
    recommendations.push('Избегайте последовательных цифр');
  }

  if (password.length >= 16 && recommendations.length === 0) {
    recommendations.push('Отличный пароль! 💪');
  }

  return recommendations;
}

