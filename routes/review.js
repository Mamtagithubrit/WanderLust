const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");


const Listing  = require("../models/listing.js");
const ReviewController=require("../controllers/reviews.js");
  

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};



// Reviews
// Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(ReviewController.createReview));



//Delete Review Route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroyReview));

module.exports = router; 