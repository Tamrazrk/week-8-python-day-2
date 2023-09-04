let lastQuoteId = null;
let currentDisplayedQuoteId = null; // To keep track of the currently displayed quote's ID
let currentAuthorQuotes = [];
let currentAuthorIndex = 0;

let isInitialized = false;  // To track if initialization is complete

async function initializeQuotes() {
    if (!localStorage.getItem('quotes')) {   
        let initialQuotes = [
            { "id": 0, "author": "Albert Einstein", "quote": "Life is like riding a bicycle. To keep your balance you must keep moving.", "likes": 0 },
            { "id": 1, "author": "Isaac Newton", "quote": "If I have seen further it is by standing on the shoulders of Giants.", "likes": 0 },
            { "id": 2, "author": "Mark Twain", "quote": "The secret of getting ahead is getting started.", "likes": 0 },
            { "id": 3, "author": "Winston Churchill", "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "likes": 0 },
            { "id": 4, "author": "Oscar Wilde", "quote": "Be yourself; everyone else is already taken.", "likes": 0 },
            { "id": 5, "author": "Mahatma Gandhi", "quote": "Be the change that you wish to see in the world.", "likes": 0 },
            { "id": 6, "author": "Thomas Edison", "quote": "I have not failed. I've just found 10,000 ways that won't work.", "likes": 0 },
            { "id": 7, "author": "Yoda", "quote": "Do, or do not. There is no try.", "likes": 0 },
            { "id": 8, "author": "Nelson Mandela", "quote": "It always seems impossible until it's done.", "likes": 0 },
            { "id": 9, "author": "Confucius", "quote": "It does not matter how slowly you go as long as you do not stop.", "likes": 0 },
            { "id": 10, "author": "Helen Keller", "quote": "Alone we can do so little; together we can do so much.", "likes": 0 },
            { "id": 11, "author": "Aristotle", "quote": "The more you know, the more you realize you don't know.", "likes": 0 },
            { "id": 12, "author": "Steve Jobs", "quote": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", "likes": 0 },
            { "id": 13, "author": "Ralph Waldo Emerson", "quote": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "likes": 0 },
            { "id": 14, "author": "William Shakespeare", "quote": "This above all: to thine own self be true.", "likes": 0 },
            { "id": 15, "author": "Maya Angelou", "quote": "You can't use up creativity. The more you use, the more you have.", "likes": 0 },
            { "id": 16, "author": "Leonardo da Vinci", "quote": "Simplicity is the ultimate sophistication.", "likes": 0 },
            { "id": 17, "author": "Marie Curie", "quote": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", "likes": 0 },
            { "id": 18, "author": "Vince Lombardi", "quote": "Perfection is not attainable, but if we chase perfection we can catch excellence.", "likes": 0 },
            { "id": 19, "author": "Friedrich Nietzsche", "quote": "He who has a why to live can bear almost any how.", "likes": 0 },
            { "id": 20, "author": "Albert Einstein", "quote": "Imagination is more important than knowledge.", "likes": 0 },
            { "id": 21, "author": "Albert Einstein", "quote": "If we knew what it was we were doing, it would not be called research, would it?", "likes": 0 },
            { "id": 22, "author": "Albert Einstein", "quote": "Anyone who has never made a mistake has never tried anything new.", "likes": 0 },
            { "id": 23, "author": "Albert Einstein", "quote": "The true sign of intelligence is not knowledge but imagination.", "likes": 0 },
            { "id": 24, "author": "Albert Einstein", "quote": "The only source of knowledge is experience.", "likes": 0 }

        ];
        localStorage.setItem('quotes', JSON.stringify(initialQuotes));
    }
    isInitialized = true;  // Set this to true once initialization is complete
}

initializeQuotes();  // Call this function on page load

function getQuotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('quotes'));
}

function generateQuote() {
    if (!isInitialized) {
        setTimeout(generateQuote, 100);  // If not initialized, try again after 100ms
        return;
    }

    let quotes = getQuotesFromLocalStorage();
    let randomQuote;
    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote.id === lastQuoteId);

    lastQuoteId = randomQuote.id;
    currentDisplayedQuoteId = randomQuote.id;  // Store the current displayed quote's ID
    displayQuote(randomQuote);
}

function addQuote() {
    let quoteText = document.getElementById("quoteInput").value;
    let authorText = document.getElementById("authorInput").value;

    if (!quoteText.trim() || !authorText.trim()) {
        alert("Please ensure both quote and author fields are filled.");
        return;
    }

    let quotes = getQuotesFromLocalStorage();

    quotes.push({
        id: quotes.length,
        author: authorText,
        quote: quoteText,
        likes: 0
    });

    // Save the updated quotes list to localStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Clear input fields after adding
    document.getElementById("quoteInput").value = "";
    document.getElementById("authorInput").value = "";

    alert("Quote successfully added!");
}
function countCharacters(includeSpaces) {
    let currentQuote = document.getElementById("quoteSection").innerText.split('-')[0].trim();
    if (!includeSpaces) {
        currentQuote = currentQuote.replace(/ /g, '');
    }
    alert(`Characters: ${currentQuote.length}`);
}

function countWords() {
    let currentQuote = document.getElementById("quoteSection").innerText.split('-')[0].trim();
    let wordCount = currentQuote.split(' ').length;
    alert(`Words: ${wordCount}`);
}

function likeQuote() {
    let quotes = getQuotesFromLocalStorage();

    if (currentDisplayedQuoteId !== null) {
        let currentQuote = quotes.find(q => q.id === currentDisplayedQuoteId);
        currentQuote.likes++;
        alert(`Liked! This quote now has ${currentQuote.likes} likes.`);
        
        // Save the updated quotes list to localStorage
        localStorage.setItem('quotes', JSON.stringify(quotes));
    } else {
        alert("No quote is currently displayed.");
    }
}

function displayQuote(quote) {
    document.getElementById("quoteSection").innerHTML = `"${quote.quote}" - ${quote.author}`;
}

function filterByAuthor() {
    let author = document.getElementById("filterAuthorInput").value.trim();
    let quotes = getQuotesFromLocalStorage();

    if (!author) {
        alert("Please enter an author name to filter.");
        return;
    }

    currentAuthorQuotes = quotes.filter(q => q.author === author);
    
    if (!currentAuthorQuotes.length) {
        alert("No quotes found for this author.");
        return;
    }
    
    currentAuthorIndex = 0;
    currentDisplayedQuoteId = currentAuthorQuotes[currentAuthorIndex].id;  // Update currentDisplayedQuoteId
    displayQuote(currentAuthorQuotes[currentAuthorIndex]);
}

function previousQuote() {
    if (currentAuthorQuotes.length === 0) {
        alert("Please filter by author first.");
        return;
    }

    if (currentAuthorIndex > 0) {
        currentAuthorIndex--;
        currentDisplayedQuoteId = currentAuthorQuotes[currentAuthorIndex].id;  // Update currentDisplayedQuoteId
        displayQuote(currentAuthorQuotes[currentAuthorIndex]);
    } else {
        alert("This is the first quote of the selected author.");
    }
}

function nextQuote() {
    if (currentAuthorQuotes.length === 0) {
        alert("Please filter by author first.");
        return;
    }

    if (currentAuthorIndex < currentAuthorQuotes.length - 1) {
        currentAuthorIndex++;
        currentDisplayedQuoteId = currentAuthorQuotes[currentAuthorIndex].id;  // Update currentDisplayedQuoteId
        displayQuote(currentAuthorQuotes[currentAuthorIndex]);
    } else {
        alert("This is the last quote of the selected author.");
    }
}
