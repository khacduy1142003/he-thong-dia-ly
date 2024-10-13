module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  reverseData: function (mongooses) {
    return mongooses
      .slice()
      .reverse()
      .map((mongoose) => mongoose.toObject());
  },
};
