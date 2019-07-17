const express = require('express');
const app = express();

// route get'/quotes' for read all quotes
app.get('/quotes',(req,res)=>{
  res.json(data);
});
// route get'/quotes/:id' for read a quote
app.get('/quotes/:id',(req,res)=>{
  const quote = data.quotes.find(quote => quote.id == req.params.id);
  res.json(quote);
});
// route get'/quotes/quote/random for read a random quote
// route post '/quotes' for create a new quote
// route put '/quotes/:id' for update a quote
// route delete '/quotes/:id' for delete a quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


const data = {
    quotes: [
      {
        id: 8721,
        quote: "We must accept finite disappointment, but we must never lose infinite hope.",
        author: "Martin Luther King"
      },
      {
        id: 5779,
        quote: "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
        author: "Yvonne Pierre"
      },
      {
        id: 3406,
        quote: "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
        author: "Barbara DeAngelis"
      }
    ]
  }
