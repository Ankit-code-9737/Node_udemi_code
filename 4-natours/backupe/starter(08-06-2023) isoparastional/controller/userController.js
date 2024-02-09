const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getallusers = (req, res) => {
  res.status(500).json({
    status: 'success',
    says: 'Ankiii',
    result: users.length,
    data: {
      users,
    },
  });
};

exports.createuser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'user not found!',
  });
};

exports.getuser = (req, res) => {
  // console.log(req.params);
  // const user = req.params.user;
  // const name = users.find((el) => el.user === user);

  res.status(500).json({
    status: 'success',
    // data: {
    //   name,
    // },
  });
};

exports.userupdate = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'user not found!',
  });
};
exports.userdelete = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'user not found!',
  });
};
