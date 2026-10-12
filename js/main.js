"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Benjamin Björkström
 */

// Hämtar formuläret och de element som behövs från HTML.
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");
const recipeSection = document.getElementById("recipe");
const messageSection = document.getElementById("message");

/**
 * Hämtar recept från DummyJSON API.
 * @param {string} searchPhrase - Det användare söker efter.
 */
async function fetchRecipes(searchPhrase) {
    // Skapa API-adressen med användarens sökfras.
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchPhrase)}`;

    // Hämta data från API:t.
    const response = await fetch(url);

    // Kontrollera att servern svarade utan HTTP-fel.
    if (!response.ok) {
        throw new Error("Kunde inte hämta recept från API:t.");
    }

    // Omvandla JSON-svaret till ett JavaScript-objekt.
    const data = await response.json();

    // Returnera den hämtade datan.
    return data;
    
}

/**
 * Visar ett recept på webbsidan.
 * @param {Object} recipe - Receptdata från API:t.
 */
function displayRecipe(recipe) {
    // Skapa ett article-element för receptet.
    const article = document.createElement("article");

    // Skapa receptets rubrik.
    const heading = document.createElement("h3");
    heading.textContent = recipe.name;
    article.appendChild(heading);

    // Skapa receptets bild.
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    article.appendChild(image);

    // Visa grundläggande information om receptet.
    const info = document.createElement("div");
    info.className = "recipe-info";

    info.innerHTML = `
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Prep time:</strong> ${recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cooking time:</strong> ${recipe.cookTimeMinutes} minutes</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
    `;

    article.appendChild(info);

    // Skapa rubrik och punktlista för ingredienser.
    const ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredients";
    article.appendChild(ingredientsHeading);

    const ingredientsList = document.createElement("ul");

    recipe.ingredients.forEach(function (ingredient) {
        const item = document.createElement("li");
        item.textContent = ingredient;
        ingredientsList.appendChild(item);
    });

    article.appendChild(ingredientsList);

    // Skapa rubrik och numrerad lista för instruktioner.
    const instructionsHeading = document.createElement("h4");
    instructionsHeading.textContent = "Instructions";
    article.appendChild(instructionsHeading);

    const instructionsList = document.createElement("ol");

    recipe.instructions.forEach(function (instruction) {
        const item = document.createElement("li");
        item.textContent = instruction;
        instructionsList.appendChild(item);
    });

    article.appendChild(instructionsList);

    // Lägg till det färdiga receptet på sidan.
    recipeSection.appendChild(article);
}

/**
 * Lyssnar efter när användaren skickar formuläret.
 */
searchForm.addEventListener("submit", async function (event) {
    // Förhindra att sidan laddas om när formuläret skickas.
    event.preventDefault();

    // Hämta sökfrasen och ta bort mellanslag i början och slutet.
    const searchPhrase = searchInput.value.trim();

    // Kontrollera att användaren har skrivit något.
    if (searchPhrase === "") {
        errorMessage.textContent = "Ange ett recept att söka efter.";
        return;
    }

    // Ta bort gamla felmeddelanden och resultat.
    errorMessage.textContent = "";
    messageSection.textContent = "";
    recipeSection.innerHTML = "";

    // Försök hämta och visa receptet.
    try {
        // Hämta recepten från API:t.
        const data = await fetchRecipes(searchPhrase);

        // Kontrollera om sökningen gav några recept.
        if (data.recipes.length === 0) {
            messageSection.textContent =
                "Inga recept hittades. Prova en annan sökfras.";
            return;
        }

        // Visa det första receptet i sökresultatet.
        displayRecipe(data.recipes[0]);

    } catch (error) {
        // Visa ett begripligt felmeddelande på webbsidan.
        messageSection.textContent =
            "Kunde inte hämta recepten. Försök igen senare.";

        // Visa teknisk information i konsolen.
        console.error("Ett fel uppstod:", error);
    }
});

