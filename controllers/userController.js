const user = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

filterObj = (obj, ...allowedFields) => {
  Object.keys(obj).forEach((el) => {
    if (!allowedFields.includes(el)) delete obj[el];
  });
  return obj;
};

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await user.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
  next();
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const User = await user.findByIdAndUpdate(req.user.id);
  User.active = false;
  await User.save();
  res.status(204).json({
    message: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).send('Route not defied yet');
};
