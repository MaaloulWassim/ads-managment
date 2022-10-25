const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Ad = require("../models/ad");
const User = require("../models/user");

const getAdById = async (req, res, next) => {
  const adId = req.params.aid;

  let ad;
  try {
    ad = await Ad.findById(adId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a advertisement.",
      500
    );
    return next(error);
  }

  if (!ad) {
    const error = new HttpError(
      "Could not find advertisement for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ ad: ad.toObject({ getters: true }) });
};

const getAdsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithAds;
  try {
    userWithAds = await User.findById(userId).populate("ads");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithAds || userWithAds.ads.length === 0) {
    return next(
      new HttpError("Could not find ads for the provided user id.", 404)
    );
  }

  res.json({
    ads: userWithAds.ads.map((ad) => ad.toObject({ getters: true })),
  });
};

const createAd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, category, creator } = req.body;

  const createdAd = new Ad({
    title,
    description,
    category,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating ad failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAd.save({ session: sess });
    user.ads.push(createdAd);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating ad failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ ad: createdAd });
};

exports.getAdById = getAdById;
exports.getAdsByUserId = getAdsByUserId;
exports.createAd = createAd;
