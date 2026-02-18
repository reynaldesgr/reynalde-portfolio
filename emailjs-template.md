# Template EmailJS complet

Copiez-collez les sections ci-dessous dans votre template sur [EmailJS](https://dashboard.emailjs.com/).

**Limite 50 Ko** : Le plan gratuit EmailJS autorise au maximum 50 Ko pour l’ensemble des variables. Avec uniquement les champs texte (nom, email, téléphone, entreprise, message), vous restez largement en dessous de cette limite.

---

## 1. To Email (destinataire)

Votre adresse email qui recevra les messages, par exemple :

```
reynalde.sgr@outlook.fr
```

---

## 2. Subject (objet)

```
[Portfolio] Message de {{from_name}} — {{from_company}}
```

*(Si pas d’entreprise, vous verrez juste le nom.)*

---

## 3. Content (corps du message)

Collez ce bloc dans l’éditeur **Content** du template. Les variables `{{...}}` seront remplacées par les données du formulaire.

```
Nouveau message reçu depuis le formulaire de contact du portfolio.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EXPÉDITEUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom :       {{from_name}}
Email :     {{from_email}}
Téléphone : {{from_phone}}
Entreprise: {{from_company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. Variables utilisées (résumé)

| Variable         | Description                          |
|------------------|--------------------------------------|
| `{{from_name}}`  | Nom de la personne                   |
| `{{from_email}}` | Adresse email                        |
| `{{from_phone}}` | Téléphone                            |
| `{{from_company}}` | Entreprise                         |
| `{{message}}`    | Contenu du message                   | Si vous en aviez déjà une (ex. `pdf_attachment`), supprimez-la dans l’onglet **Attachments**.
