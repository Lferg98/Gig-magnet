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

  type Booking {
    _id: ID!
    event: Event!
    user: User!
  }

  type AuthCredentials {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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
    bookings: [Booking]!
    login(email: String!, password: String!): AuthCredentials
  }
  
  type Mutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!

  }
  `);

  module.exports = schema;
