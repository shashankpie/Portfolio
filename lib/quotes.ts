import quotesData from '@/content/quotes.json';

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export function getAllQuotes(): Quote[] {
  return quotesData;
}

export function getRandomQuote(): Quote {
  const quotes = getAllQuotes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export function getQuoteById(id: number): Quote | undefined {
  return getAllQuotes().find(quote => quote.id === id);
}