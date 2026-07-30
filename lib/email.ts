/**
 * Envoi des formulaires par email via Web3Forms (https://web3forms.com).
 * L'offre gratuite impose une soumission côté navigateur : ce helper est donc
 * appelé depuis les composants client. La clé d'accès Web3Forms n'est pas
 * secrète (elle est prévue pour un usage public côté client).
 */

export const WEB3FORMS_ACCESS_KEY = "85127a5e-b1b8-425f-9080-a0c6abe47644";

type Fields = Record<string, string | undefined>;

/** Envoie les données du formulaire par email. Renvoie true si l'envoi a réussi. */
export async function sendEmail(subject: string, fields: Fields): Promise<boolean> {
  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: "Site Saint-Médard Rugby Club",
  };
  for (const [key, value] of Object.entries(fields)) {
    if (value) payload[key] = value;
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { success?: boolean };
    return res.ok && json.success === true;
  } catch {
    return false;
  }
}
