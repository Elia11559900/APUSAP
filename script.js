document.getElementById("messeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi standard du formulaire

    // Collecter les données du formulaire
    const nom = document.getElementById("nom").value;
    const jours = parseInt(document.getElementById("jours").value);
    const heure = document.getElementById("heure").value;
    const telephone = document.getElementById("telephone").value;
    const demandeText = document.getElementById("demande").value;

    let dateString = '';
    if (jours === 1) {
        const dateUnique = document.getElementById("dateUnique").value;
        dateString = `Date de la Messe: ${dateUnique}`;
    } else if (jours > 1) {
        const dateDebut = document.getElementById("dateDebut").value;
        const dateFin = document.getElementById("dateFin").value;
        dateString = `Date de Début: ${dateDebut}\nDate de Fin: ${dateFin}`;
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

    // Encoder le message pour les URLs
    const encodedMessage = encodeURIComponent(message);

    // Numéros et email pour l'envoi
    const whatsappNumber = "22991755979"; // Numéro WhatsApp fourni
    const emailAddress = "technologiegklm@gmail.com"; // Adresse Email fournie
    const emailSubject = encodeURIComponent("Demande de Messe depuis le site web");

    // Ouvrir WhatsApp
    // Utilisation de wa.me qui est plus fiable sur différentes plateformes
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank'); // Ouvre dans un nouvel onglet/fenêtre

    // Ouvrir l'application email
    const emailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${encodedMessage}`;
    window.open(emailUrl, '_blank'); // Ouvre dans un nouvel onglet/fenêtre

    // Afficher le message de confirmation (après avoir ouvert les liens)
    document.getElementById("confirmationMessage").style.display = "block";

    // Réinitialiser le formulaire
    this.reset();
    // Réinitialiser les champs de date spécifiquement (pour clear leurs valeurs)
    resetDateFields();
    // Appeler gererAffichageDates après reset pour masquer/afficher correctement si le nombre de jours par défaut changeait
    // ou si la valeur par défaut est 1 et les champs doivent s'afficher après reset.
    gererAffichageDates();
});

// Fonction pour gérer l'affichage des champs de date
function gererAffichageDates() {
    const joursInput = document.getElementById("jours");
    const jours = parseInt(joursInput.value); // Assurez-vous que c'est un nombre
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

    } else { // Gère le cas où la valeur n'est pas un nombre valide ou est vide (après reset par exemple)
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
    // Note: La fonction gererAffichageDates() appelée après reset s'occupe déjà de clear les champs cachés,
    // mais garder cette fonction ne fait pas de mal et peut être utile si resetDateFields était appelée seule.
}


// Appeler la fonction au chargement de la page et à chaque changement du nombre de jours
// Utilisation de 'input' pour réagir immédiatement aux changements de valeur
document.addEventListener("DOMContentLoaded", function() {
     // Ajoute une valeur par défaut si le champ jours est vide au chargement
    const joursInput = document.getElementById("jours");
    if (!joursInput.value) {
        joursInput.value = "1";
    }
    gererAffichageDates(); // Appel initial au chargement

    // Écouteur pour les changements dans le champ 'jours'
    joursInput.addEventListener("input", gererAffichageDates);
});