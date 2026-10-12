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
}
