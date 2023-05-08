const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

// graphql schemas - resolvers 
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }   
        
        type RootMutation {
            createEvent(name: String): String
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Club event', 'Esoteric Festival', 'My-Aeon'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
})
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

