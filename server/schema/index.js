const { buildSchema } = require('graphql');

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
    createdEvents: [Event!]
  }

  type Gig {
    _id: ID!
    event: Event!
    user: User!
 
    
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
    gigs: [Gig]!
  }
  
  type Mutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(event: ID!): Gig!

  }
  `);

  module.exports = schema;
