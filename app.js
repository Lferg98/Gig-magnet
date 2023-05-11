require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcrypt');

const { connect, connection } = require('./connection');

const Event = require('./models/event');
const User = require('./models/user');

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

  type User {
    _id: ID!
    email: String!
    password: String
  }

  input UserInput {
    email: String!
    password: String!
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
    createUser(userInput: UserInput): User
  }

`);

const rootValue = {
  events: () => {
    return Event.find()
    .then(events => {
      return events.map(event => {
          return { ...event._doc, _id: event.id };
      });
    })
    
    .catch(err => {
      throw err;
    });
  },
  createEvent: args => {
    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
    });
    return event.save()
    .then(result => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
  },

  createUser: args => {
    return User.findOne({ email: args.userInput.email})
    .then(user => {
      if (user) {
        throw new Error('User already exists.');
      }
      return bcrypt.hash(args.userInput.password, 12);
    })
    .then(hashedPassword => {
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      return {...result._doc,password: null, _id: result.id };
    })
    .catch(err => {
      throw err;
    });

  }
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
