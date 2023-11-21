// check username and password in post(login) request
// if exists, create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

// THIS WILL PROJECT WILL NOT HAVE A DATABASE, WE WILL MANUALLY CHECK THE USERNAME AND THE PASSWORD

require("dotenv").config();
const request = require("request");

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }

  const id = new Date().getDate(); // Just for demo, normally provided by DB!!

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res) => {
  request.get(
    {
      url: "https://api.api-ninjas.com/v1/quotes",
      headers: { "X-Api-Key": process.env.NINJA_API_KEY },
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
