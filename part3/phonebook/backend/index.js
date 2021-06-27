require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Person = require('./models/person.js');

var morgan = require('morgan');
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan(function (tokens, req, res) {
  // console.log(req.body)
  return [
    req.method,
    req.url,
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ');
}));

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  // MongoDB Validation Error
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const generateId = () => {
  const MAX_ID = 1000000;
  return Math.floor(Math.random() * MAX_ID);
};


app.get('/', (request, response) => {
  response.send('<h1>This backend server is running.</h1>');
});


app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}</p>
  `);
  });

});

app.get('/api/persons/:id', (request, response, next) => {
  // console.log('wants to get id')
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch(error => next(error));
});


app.get('/api/persons/', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  // console.log('wants to delete')
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons/', (request, response, next) => {
  // console.log('wants to create new')
  const body = request.body;
  // console.log(body)
  if (!body.name || !body.number) return response.status(400).json({ error: 'missing name or number' });

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => {
      next(error);
    });

  //find duplicate
  // Person.find({ name: body.name }).then(result => {
  //   if (result.length > 0) return response.status(400).json({ error: "name must be unique" })
  //   else {
  //     const person = new Person({
  //       name: body.name,
  //       number: body.number,
  //       id: generateId()
  //     })

  //     person.save().then(savedPerson => {
  //       response.json(savedPerson)
  //     })
  //   }
  // })
});

app.put('/api/persons/:id', (request, response, next) => {
  // console.log(`wants to update ${request.params.id}`)
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number
  };
  console.log(person);
  //third parameter specifying updatedPerson will be the new one as opposed to the unchanged one
  Person.findByIdAndUpdate(request.params.id, {
    name: body.name,
    number: body.number
  }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

