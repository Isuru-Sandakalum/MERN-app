import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

//controller function for create list
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//controller function for deleteList
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

//controller function for update List
export const updateListing = async (req, res, next) => {
  //to grab user using id
  const listing = await Listing.findById(req.params.id);
  //condition for there is no list found
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  //if id has grab has no list then run below condition
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own list"));
  }
  //if thare is a list related to list then able to edit
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "No such listing exists"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

//for get all listings according to the search
export const getListings = async (req, res, next) => {
  try {
    //search lmit setup
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    //set offer by default false when search its only available only search term based results only
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    //set furnished by default false when search
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    //set Parking by default false when search
    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    //set type by default false and select all
    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    //get the listings and search using regex from mongo inbuild search funtion
    // options i measn ignore lower and upper case
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
