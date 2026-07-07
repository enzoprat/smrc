#!/usr/bin/env node
/**
 * Génère un hash bcrypt pour le mot de passe administrateur.
 * Usage :
 *   node scripts/hash-password.mjs "MonMotDePasse"
 * Puis copiez la valeur dans ADMIN_PASSWORD_HASH (.env.local / Vercel).
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage : node scripts/hash-password.mjs "votre-mot-de-passe"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
