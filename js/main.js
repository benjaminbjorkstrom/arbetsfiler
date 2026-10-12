"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Benjamin Björkström
 */

// Hämtar formuläret och de element som behövs från HTML.
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");

// Lyssnar efter när användaren skickar formuläret.
searchForm.addEventListener("submit", function (event) {
    // Förhindra att sidan laddas om när formuläret skickas.
    event.preventDefault();

    // Hämta sökfrasen och ta bort mellanslaget i början och slutet.
    const searchPhrase = searchInput.value.trim();

    // Kontrollera att användaren har skrivit något.
    if (searchPhrase === "") {
        errorMessage.textContent = "Ange ett recept att söka efter.";
        return;
    }

    // Ta bort tidigare felmeddelande vid en giltig sökning.
    errorMessage.textContent = "";

    // Visa sökfrasen i konsolen medan vi testar.
    console.log("Du söker efter:", searchPhrase);
});
