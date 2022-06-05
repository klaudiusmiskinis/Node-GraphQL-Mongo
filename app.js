const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const app = express();

var schema = buildSchema(`
  type Query {
    hello: String
    random: Float
    rollDice(numDice: Int!, numSides: Int): [Int]
  },
`);

var root = {
  hello: () => {
    return "Hello world!";
  },
  random: () => {
    return Math.random().toFixed(2);
  },
  rollDice: (args) => {
    console.log(args);
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
