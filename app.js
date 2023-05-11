require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');


const { connect, connection } = require('./connection');


const gqlResolvers = require('./server/resolvers/index.js');
const gqlSchema = require('./server/schema/index.js');



const app = express();
const PORT = 3000;

connect();



app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema: gqlSchema,
  rootValue: gqlResolvers,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
