const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

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
  quoteTextElement.innerHTML = `"${quote.content}"`;
  quoteAuthorElement.textContent = `- ${quote.author}`;
}

// Function to get a new random quote
async function getNewQuote() {
  const quote = await fetchRandomQuote();
  updateQuote(quote);
}

// Event listener for the "New Quote" button
newQuoteBtn.addEventListener('click', getNewQuote);

// Get and display initial quote
getNewQuote();
