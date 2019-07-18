const express = require('express');
const app = express();
const records = require('./records.js');

app.use(express.json());

function asyncHandler(cb){
  return async (req,res,next) =>{
    try{
      await cb(req,res,next);
    }catch(err){
      next(err);
    }
  }
}

// route get'/quotes' for read all quotes
app.get('/quotes', asyncHandler(async (req,res,next)=>{
  throw new Error('error from server');
  const quotes = await records.getQuotes();
  res.json(quotes)
}));
// route get'/quotes/:id' for read a quote
app.get('/quotes/:id',asyncHandler(async (req,res,next)=>{
  const quote = await records.getQuote(req.params.id);
  if(quote){
    res.json(quote);
  } else {
    res.status(404).json({message:"Not found: there seems to no matching ID."})
  }

}));

// route post '/quotes' for create a new quote
app.post('/quotes', asyncHandler(async (req,res,next)=>{
  if(req.body.quote && req.body.quthor){
    const quote = await records.createQuote({
      quote: req.body.quote,
      author: req.body.author
    });
    res.status(201).json(quote);
  } else {
    res.status(400).json({message:"Quote and Author required"});
  }

}));
// route put '/quotes/:id' for update a quote
app.put('/quotes/:id', asyncHandler(async (req,res,next)=>{
  const quote = await records.getQuote(req.params.id);
  if(quote){
    quote.quote = req.body.quote;
    quote.author = req.body.author;
    await records.updateQuote(quote);
    res.status(204).end();
  }else{
    res.status(404).json({message:"Not found: there seems to no matching ID."})
  }
}))
// route delete '/quotes/:id' for delete a quote
app.delete('/quotes/:id',asyncHandler(async(req,res,next)=>{
  const quote = await records.getQuote(req.params.id);
  if(quote){
    await records.deleteQuote(quote);
    res.status(204).end();
  } else {
    res.status(404).json({message:"Not found: there seems to no matching ID."})
  }
}))

// route get'/quotes/quote/random for read a random quote
app.get('/quotes/quote/random', asyncHandler(async(req,res,next)=>{
  const quote = await records.getRandomQuote();
  res.status(200).json(quote);
}))

//for 404
app.use((req,res,next)=>{
  const err = new Error('Not Found');
  err.status=404;
  next(err);
});

//error handler
app.use((err,req,res,next)=>{
  console.log(err.message);
  res.status(err.status || 500);
  res.json({error:{
    message:err.message
  }});
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
