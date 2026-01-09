// src/lib/crypto.ts

// ---------- TYPES ----------
export type EncryptedPayload = {
  iv: Uint8Array;
  ciphertext: ArrayBuffer;
};

export type SignedPayload = {
  hash: string;
  signature: string;
};

// ---------- HELPERS ----------
function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64: string): ArrayBuffer {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
}

// ---------- KEY GENERATION ----------

// AES-GCM key (file encryption)
export async function generateAESKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

// Ed25519 signing key pair
export async function generateSigningKeyPair() {
  return crypto.subtle.generateKey(
    { name: 'Ed25519' },
    true,
    ['sign', 'verify']
  );
}

// X25519 key exchange (for sharing AES key)
export async function generateKeyExchangePair() {
  return crypto.subtle.generateKey(
    { name: 'X25519' },
    true,
    ['deriveKey', 'deriveBits']
  );
}

// ---------- ENCRYPT / DECRYPT ----------

// Encrypt file with AES-GCM
export async function encryptFile(
  file: ArrayBuffer,
  key: CryptoKey
): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    file
  );

  return { iv, ciphertext };
}

// Decrypt file
export async function decryptFile(
  encrypted: EncryptedPayload,
  key: CryptoKey
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: encrypted.iv },
    key,
    encrypted.ciphertext
  );
}

// ---------- HASHING ----------

// SHA-256 hash
export async function sha256(data: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', data);
  return bufferToBase64(hash);
}

// ---------- SIGNATURES ----------

// Sign hash (Ed25519)
export async function signHash(
  hashBase64: string,
  privateKey: CryptoKey
): Promise<string> {
  const hashBuffer = base64ToBuffer(hashBase64);

  const signature = await crypto.subtle.sign(
    { name: 'Ed25519' },
    privateKey,
    hashBuffer
  );

  return bufferToBase64(signature);
}

// Verify signature
export async function verifySignature(
  hashBase64: string,
  signatureBase64: string,
  publicKey: CryptoKey
): Promise<boolean> {
  return crypto.subtle.verify(
    { name: 'Ed25519' },
    publicKey,
    base64ToBuffer(signatureBase64),
    base64ToBuffer(hashBase64)
  );
}

// ---------- KEY WRAPPING (SECURE SHARING) ----------

// Encrypt AES key using recipient public key (X25519)
export async function wrapAESKey(
  aesKey: CryptoKey,
  senderPrivateKey: CryptoKey,
  recipientPublicKey: CryptoKey
): Promise<string> {
  const sharedSecret = await crypto.subtle.deriveKey(
    {
      name: 'X25519',
      public: recipientPublicKey
    },
    senderPrivateKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const rawAES = await crypto.subtle.exportKey('raw', aesKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedKey = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    sharedSecret,
    rawAES
  );

  return bufferToBase64(
    new Uint8Array([...iv, ...new Uint8Array(encryptedKey)]).buffer
  );
}

// Decrypt AES key (recipient side)
export async function unwrapAESKey(
  wrappedKeyBase64: string,
  recipientPrivateKey: CryptoKey,
  senderPublicKey: CryptoKey
): Promise<CryptoKey> {
  const data = new Uint8Array(base64ToBuffer(wrappedKeyBase64));
  const iv = data.slice(0, 12);
  const encryptedKey = data.slice(12);

  const sharedSecret = await crypto.subtle.deriveKey(
    {
      name: 'X25519',
      public: senderPublicKey
    },
    recipientPrivateKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const rawAES = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    sharedSecret,
    encryptedKey
  );

  return crypto.subtle.importKey(
    'raw',
    rawAES,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
}