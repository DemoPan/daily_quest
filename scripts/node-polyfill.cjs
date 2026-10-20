/**
 * Node 16 Crypto Polyfill
 * Vite 5 uses crypto.getRandomValues directly from 'node:crypto',
 * which was introduced in Node.js 18+. This polyfill ensures seamless
 * backward compatibility when running on Node.js 16.
 */
try {
  const crypto = require('node:crypto');
  if (crypto && !crypto.getRandomValues && crypto.webcrypto) {
    crypto.getRandomValues = crypto.webcrypto.getRandomValues.bind(crypto.webcrypto);
  }
  if (typeof globalThis !== 'undefined' && !globalThis.crypto && crypto?.webcrypto) {
    globalThis.crypto = crypto.webcrypto;
  }
} catch (e) {
  // Ignore in environments where crypto is already modern
}
