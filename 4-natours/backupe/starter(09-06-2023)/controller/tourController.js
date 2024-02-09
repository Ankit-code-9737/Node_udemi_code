const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.topFivetour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage, price';
  req.query.fields = 'name, price, ratingsAverage, summary';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // console.log(req.query);

  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitfields()
    .pagination();
  const tours = await features.query;

  // SEND RESPONCE
  res.status(200).json({
    status: 'success',
    says: 'Ankiii',
    result: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.findById(req.params.id);
  // Tour findOne ({ _id: req.params.id })

  if (!tours) {
    return next(new AppError('Aa user nai ahiya', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

exports.createTours = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      newTour,
    },
  });
});

exports.updateTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tours) {
    return next(new AppError('Aa user nai ahiya', 404));
  }

  res.status(200).json({
    status: 'Success',
    message: 'Update done!',
    data: {
      tours,
    },
  });
});

exports.deleteTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.findByIdAndDelete(req.params.id);

  if (!tours) {
    return next(new AppError('Aa user nai ahiya', 404));
  }

  res.status(200).json({
    status: 'Success',
    message: 'Delete tour!',
  });
});

exports.getTourstats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTour: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourstats: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numTourstats: -1,
      },
    },
    // {
    //   $limit: 12,
    // },
  ]);

  res.status(200).json({
    status: 'Success',
    plan,
  });
});
