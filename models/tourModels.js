const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    days: {
      type: Number,
      required: [true],
      trim: true,
      min: [1, 'no of days should be greater than 1'],
    },
    title: {
      type: String,
      required: [true],
      trim: true,
      maxlength: [100, 'Must have greater than or equal to 100 characters'],
      minlength: [30, 'Must have greater than or equal to 30 characters'],
      validate: {
        message: 'Price should be greater than 1000 !!',
        validator: function (val) {
          return val.length > 30;
        },
      },
    },
    places: { type: [String], required: [true], trim: true },
    inclusions: {
      type: [String],
      required: [true],
      trim: true,
    },
    imglink: { type: String, required: [true], trim: true },
    optional: { type: [String], trim: true },
    price: {
      type: Number,
      required: [true],

      validate: {
        message: 'Price should be greater than 1000 !!',
        validator: function (val) {
          return val > 1000;
        },
      },
    },
    page: {
      imgLinks: { type: [String] },
      title: { type: String, required: [true] },
      places: { type: [String], required: [true] },
      customisable: {
        type: String,
        enum: {
          values: [
            'This trip is completely customisable',
            'This trip is not customisable',
          ],
        },
      },
      tourItinerary: [
        {
          day: { type: String, required: [true], trim: true },
          day_img: { type: String, trim: true },
          schedule: { type: [String], required: [true], trim: true },
        },
      ],
      details: {
        otherInclusions: { type: [String], required: [true], trim: true },
        exclusions: { type: [String], required: [true], trim: true },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('noOfPlaces').get(function () {
  return this.places.length;
});

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
