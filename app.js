require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { connect, connection } = require('./connection');

const Event = require('./models/event');

const app = express();
const PORT = 3000;

connect();

const schema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  
  type Query {
    events: [Event!]!
  }
  
  type Mutation {
    createEvent(eventInput: EventInput): Event
  }
`);

const rootValue = {
  events: () => {
    return ['Club event', 'Esoteric Festival', 'My-Aeon'];
  },
  createEvent: (args) => {
    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
    });
    return event.save()
    .then(result => {
        console.log(result);
        return { ...result._doc };
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
  },
};

app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
