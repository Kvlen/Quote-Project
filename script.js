const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const lastQuoteBtn = document.getElementById('last-quote-btn');
let lastQuote = null;
let currentQuote = null;

// Function to fetch a random quote from the Quoteable API
async function fetchRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      content: 'Oops! Failed to fetch quote.',
      author: 'Unknown',
    };
  }
}

// Function to update the quote on the webpage
function updateQuote(quote) {
  lastQuote = currentQuote;
  currentQuote = quote;
  quoteTextElement.innerHTML = `"${quote.content}"`;
  quoteAuthorElement.textContent = `- ${quote.author}`;
}

// Function to get a new random quote
async function getNewQuote() {
  lastQuote = currentQuote;
  const quote = await fetchRandomQuote();
  updateQuote(quote);
}

// Function to show the last quote
function showLastQuote() {
  if (lastQuote) {
    updateQuote(lastQuote);
  }
}

// Event listeners for the "New Quote" and "Last Quote" buttons
newQuoteBtn.addEventListener('click', getNewQuote);
lastQuoteBtn.addEventListener('click', showLastQuote);

// Get and display initial quote
getNewQuote();
