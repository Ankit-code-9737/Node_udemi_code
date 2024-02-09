const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.CheckID = (req, res, next, val) => {
  console.log(`Search id is ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: "success",
      message: "not found",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.res.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Name Or price missing",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTimt);

  res.status(200).json({
    status: "success",
    requesteAdt: req.requestTimt,
    says: "Ankiii",
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTours = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: "success",
      message: "not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTours = (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.updateTours = (req, res) => {
  res.status(200).json({
    status: "nang",
    data: { tour: "Is this Post here" },
  });
};

exports.deleteTours = (req, res) => {
  res.status(204).json({
    status: "delete",
    data: null,
  });
};
