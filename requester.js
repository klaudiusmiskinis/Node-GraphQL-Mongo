const axios = require("axios");
const method = {
  post: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    url: "http://localhost:4000/graphql",
  },
};

var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

method.post.data = JSON.stringify({
  query,
  variables: { dice, sides },
});

axios(method.post).then((data) => console.log(data.data));
