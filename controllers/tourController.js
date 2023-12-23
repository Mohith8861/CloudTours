const tour = require('../models/tourModels');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTopTen = async (req, res, next) => {
  req.query.sort = '-price';
  req.query.limit = '10';
  next();
};

exports.getStats = async (req, res) => {
  const stats = await tour.aggregate([
    {
      $match: {
        price: { $gte: 20000 },
      },
    },
    {
      $group: {
        _id: {
          $toUpper: '$days',
        },
        days: {
          $max: '$days',
        },
        averagePrice: {
          $avg: '$price',
        },
        maxPrice: {
          $max: '$price',
        },
        minPrice: {
          $min: '$price',
        },
      },
    },
  ]);
  res.status(200).json({
    status: 'sucess',
    results: stats.length,
    data: stats,
  });
};

exports.getTour = catchAsync(async (req, res, next) => {
  const feature = new APIfeatures(tour.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const tours = await feature.query;

  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: tours,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tours = await tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: tours,
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await tour.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: {
      tour: newTour,
    },
  });
});

exports.searchTour = catchAsync(async (req, res, next) => {
  const tours = await tour.findById(req.params.id);
  if (!tours) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: tours,
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tours = await tour.findByIdAndDelete(req.params.id, req.body);
  if (!tours) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'sucess',
  });
});
