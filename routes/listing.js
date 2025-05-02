const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const Listing  = require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
// app.use(express.urlencode..d({ extended: true }));
const {isLoggedIn}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require('multer');


const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


    const validateListing = (req, res, next) => {
        
        const { error } = listingSchema.validate(req.body);
        console.log(error);

        if (error) {
            const errMsg = error.details.map(el => el.message).join(",");
            return next(new ExpressError(400, errMsg));
        }
        next();
    };
    


//index route//post route

router.route("/")
    .get(wrapAsync(listingController.index)
        )
        .post(isLoggedIn, upload.single('image'), validateListing, wrapAsync(listingController.addNewListing));
    
    

//New Route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));    


//show route//Update Route//delete Route
router.route("/:id") 
.get(isLoggedIn,wrapAsync(listingController.showListings))
.put(isLoggedIn,upload.single('image'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,wrapAsync(listingController.deleteListing));
        


//Edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.editListing));






module.exports=router;