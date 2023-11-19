const getFunc = (req, res) => {
  res.send("This is getFunc");
};

const postFunc = (req, res) => {
  res.send(req.body);
};

module.exports = { getFunc, postFunc };
