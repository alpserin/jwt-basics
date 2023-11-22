require("dotenv").config();
const request = require("request");

const getQuote = (username, res) => {
  request.get(
    {
      url: "https://api.api-ninjas.com/v1/quotes",
      headers: { "X-Api-Key": process.env.NINJA_API_KEY },
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ error: "Error fetching quote" });
      }

      try {
        body = body.toString("utf8");
        const quoteData = JSON.parse(body);
        const quote = quoteData[0].quote;

        return res.status(200).json({
          msg: `Hello, ${username}`,
          secret: `Here is your quote: ${quote}`,
        });
      } catch (parseError) {
        return res.status(500).json({ error: "Error parsing quote response" });
      }
    }
  );
};

module.exports = {
  getQuote,
};
