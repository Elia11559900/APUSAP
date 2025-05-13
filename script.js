document.getElementById("messeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi standard du formulaire

    // Collecter les données du formulaire
    const nom = document.getElementById("nom").value;
    const jours = parseInt(document.getElementById("jours").value);
    const heure = document.getElementById("heure").value;
    const telephone = document.getElementById("telephone").value;
    const demandeText = document.getElementById("demande").value;

    let dateString = '';
    // Récupère les valeurs des champs de date, qu'ils soient visibles ou non
    const dateUnique = document.getElementById("dateUnique").value;
    const dateDebut = document.getElementById("dateDebut").value;
    const dateFin = document.getElementById("dateFin").value;


    if (jours === 1) {
        dateString = `Date de la Messe: ${dateUnique}`;
    } else if (jours > 1) {
        dateString = `Date de Début: ${dateDebut}\nDate de Fin: ${dateFin}`;
    } else {
         // Cas où jours est 0 ou non valide, pas de date spécifique
         dateString = "Date(s) non spécifiée(s) / Nombre de jours non valide";
    }


    // Construire le message complet
    const message =
        `Demande de Messe\n\n` +
        `Nom et Prénom(s): ${nom}\n` +
        `Nombre de Jours: ${jours}\n` +
        `Heure de la Messe: ${heure}\n` +
        `${dateString}\n` + // Ajoute la ligne de date appropriée
        `Numéro de Téléphone: ${telephone}\n\n` +
        `Demande:\n${demandeText}`;

    // Encoder le message pour l'URL WhatsApp
    const encodedMessage = encodeURIComponent(message);

    // Numéro WhatsApp pour l'envoi (Utilisé celui du dernier script fourni)
    const whatsappNumber = "22991755979";

    // Construire l'URL WhatsApp
    // Utilisation de wa.me qui est plus fiable sur différentes plateformes
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Rediriger ou ouvrir WhatsApp dans un nouvel onglet/fenêtre
    // Ouvrir dans un nouvel onglet (_blank) est généralement préférable pour ne pas quitter la page du formulaire
    window.open(whatsappUrl, '_blank');

    // Afficher le message de confirmation
    document.getElementById("confirmationMessage").style.display = "block";

    // Réinitialiser le formulaire
    this.reset();
    // Réinitialiser les champs de date spécifiquement (pour clear leurs valeurs)
    resetDateFields();
    // Appeler gererAffichageDates après reset pour masquer/afficher correctement selon la valeur par défaut
    gererAffichageDates();
});

// Fonction pour gérer l'affichage des champs de date
function gererAffichageDates() {
    const joursInput = document.getElementById("jours");
    // Utilisez || 0 pour traiter les valeurs vides ou non numériques comme 0
    const jours = parseInt(joursInput.value) || 0;
    const dateUniqueContainer = document.getElementById("dateUniqueContainer");
    const datesMultiplesContainer = document.getElementById("datesMultiplesContainer");
    const dateUniqueField = document.getElementById("dateUnique");
    const dateDebutField = document.getElementById("dateDebut");
    const dateFinField = document.getElementById("dateFin");


    if (jours === 1) {
        dateUniqueContainer.style.display = "block";
        datesMultiplesContainer.style.display = "none";
        // Rendre le champ dateUnique requis, et les autres non requis
        dateUniqueField.required = true;
        dateDebutField.required = false;
        dateFinField.required = false;
         // Clear values of hidden fields
        dateDebutField.value = '';
        dateFinField.value = '';

    } else if (jours > 1) {
        dateUniqueContainer.style.display = "none";
        datesMultiplesContainer.style.display = "block";
        dateUniqueField.required = false;
        dateDebutField.required = true;
        dateFinField.required = true;
         // Clear value of hidden field
        dateUniqueField.value = '';

    } else { // Gère le cas où la valeur n'est pas un nombre valide, est 0 ou est vide
        dateUniqueContainer.style.display = "none";
        datesMultiplesContainer.style.display = "none";
        dateUniqueField.required = false;
        dateDebutField.required = false;
        dateFinField.required = false;
         // Clear values of all date fields
        dateUniqueField.value = '';
        dateDebutField.value = '';
        dateFinField.value = '';
    }
     // Assurez-vous que le message de confirmation est caché quand on interagit avec le formulaire
     document.getElementById("confirmationMessage").style.display = "none";
}

//Fonction pour réinitialiser les champs date (utilisée après reset du formulaire)
function resetDateFields() {
    document.getElementById("dateUnique").value = "";
    document.getElementById("dateDebut").value = "";
    document.getElementById("dateFin").value = "";
}


// Appeler la fonction au chargement de la page et à chaque changement du nombre de jours
// Utilisation de 'input' pour réagir immédiatement aux changements de valeur
document.addEventListener("DOMContentLoaded", function() {
     // Ajoute une valeur par défaut si le champ jours est vide au chargement
    const joursInput = document.getElementById("jours");
    // Vérifie si la valeur est vide ou non un nombre valide au chargement
    if (!joursInput.value || isNaN(parseInt(joursInput.value))) {
        joursInput.value = "1"; // Définit la valeur par défaut à 1 si elle est vide ou invalide
    }
    gererAffichageDates(); // Appel initial au chargement

    // Écouteur pour les changements dans le champ 'jours'
    joursInput.addEventListener("input", gererAffichageDates);
});