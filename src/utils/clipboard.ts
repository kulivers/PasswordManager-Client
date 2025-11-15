/**
 * Clipboard Utility Functions
 * 
 * This utility provides functions for copying text to the clipboard
 * with proper error handling and browser compatibility.
 */

/**
 * Copy text to clipboard using modern Clipboard API
 * Falls back to legacy method for older browsers
 * 
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    console.warn('Cannot copy empty text to clipboard');
    return false;
  }

  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy using Clipboard API:', error);
      // Fall through to legacy method
    }
  }

  // Fallback to legacy method
  return copyToClipboardLegacy(text);
}

/**
 * Legacy method to copy text to clipboard
 * Uses a temporary textarea element
 * 
 * @param text - The text to copy
 * @returns True if successful, false otherwise
 */
function copyToClipboardLegacy(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make it invisible
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.setAttribute('readonly', '');
    
    // Append to body
    document.body.appendChild(textarea);
    
    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    // Execute copy command
    const successful = document.execCommand('copy');
    
    // Remove the textarea
    document.body.removeChild(textarea);
    
    return successful;
  } catch (error) {
    console.error('Failed to copy using legacy method:', error);
    return false;
  }
}

/**
 * Check if clipboard API is supported
 * @returns True if clipboard API is available
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext);
}

/**
 * Copy text with automatic success/error notification
 * This is a convenience wrapper that can be used with a toast library
 * 
 * @param text - The text to copy
 * @param onSuccess - Callback function called on successful copy
 * @param onError - Callback function called on error
 */
export async function copyWithNotification(
  text: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> {
  const success = await copyToClipboard(text);
  
  if (success) {
    onSuccess?.();
  } else {
    onError?.('Не удалось скопировать в буфер обмена');
  }
}

/**
 * Copy password with security considerations
 * Optionally clears clipboard after specified timeout
 * 
 * @param password - The password to copy
 * @param clearAfterMs - Optional timeout to clear clipboard (in milliseconds)
 * @returns Promise that resolves to true if successful
 */
export async function copyPasswordSecurely(
  password: string,
  clearAfterMs?: number
): Promise<boolean> {
  const success = await copyToClipboard(password);
  
  if (success && clearAfterMs && clearAfterMs > 0) {
    // Schedule clipboard clearing
    setTimeout(async () => {
      try {
        await copyToClipboard(''); // Clear clipboard
      } catch (error) {
        console.warn('Failed to clear clipboard:', error);
      }
    }, clearAfterMs);
  }
  
  return success;
}

/**
 * Read text from clipboard
 * @returns Promise with clipboard text or null if failed
 */
export async function readFromClipboard(): Promise<string | null> {
  if (!navigator.clipboard || !window.isSecureContext) {
    console.warn('Clipboard read not supported');
    return null;
  }

  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
    return null;
  }
}

