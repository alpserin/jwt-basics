require("dotenv").config();
const request = require("request");

const API_KEY = process.env.NINJA_API_KEY;

const login = async (req, res) => {
  res.send("Fake Login/Register/Signup Route");
};

const dashboard = (req, res) => {
  request.get(
    {
      url: "https://api.api-ninjas.com/v1/quotes",
      headers: { "X-Api-Key": API_KEY },
    },
    (error, response, body) => {
      body = body.toString("utf8");
      const quoteData = JSON.parse(body);
      const quote = quoteData[0].quote;
      res.status(200).json({
        msg: `Hello, John Doe`,
        secret: `Here is your quote : ${quote}`,
      });
    }
  );
};

module.exports = {
  login,
  dashboard,
};
