/** Injecte un bloc JSON-LD dans le <head> de la page. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON sérialisé côté serveur — contenu maîtrisé (pas d'entrée utilisateur brute)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
