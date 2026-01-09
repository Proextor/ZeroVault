import { generateSigningKeyPair, generateKeyExchangePair } from './crypto'
import { supabase } from './supabase'

export async function setupUserKeys(userId: string) {
  // 1️⃣ Generate keys
  const signingKeys = await generateSigningKeyPair()
  const exchangeKeys = await generateKeyExchangePair()

  // 2️⃣ Export PUBLIC keys
  const signingPublic = await crypto.subtle.exportKey(
    'spki',
    signingKeys.publicKey
  )
  const exchangePublic = await crypto.subtle.exportKey(
    'spki',
    exchangeKeys.publicKey
  )

  // 3️⃣ Store PUBLIC keys in Supabase
  await supabase.from('user_keys').insert({
    user_id: userId,
    signing_public_key: btoa(String.fromCharCode(...new Uint8Array(signingPublic))),
    exchange_public_key: btoa(String.fromCharCode(...new Uint8Array(exchangePublic))),
  })

  // 4️⃣ Store PRIVATE keys locally (browser only)
  localStorage.setItem(
    'private_keys',
    JSON.stringify({
      signing: await crypto.subtle.exportKey('pkcs8', signingKeys.privateKey),
      exchange: await crypto.subtle.exportKey('pkcs8', exchangeKeys.privateKey),
    })
  )
}
