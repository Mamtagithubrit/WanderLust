const Listing= require("../models/listing") ;
 
 
 module.exports.index=async(req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
 };

 module.exports.renderNewForm=async(req,res)=>{    
    res.render("listings/new.ejs");
};

module.exports.showListings=async(req,res)=>{
    const listing = await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exists!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};


module.exports.addNewListing=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url, "..",filename);

    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.editListing=async(req,res)=>{

    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist!");
        req.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};


module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    
   const newListing= await Listing.findByIdAndUpdate(id, {...req.body.listing});



    if(typeof req.file!== "undefined"){
        let url=req.file.path;
         let filename=req.file.filename;
        newListing.image={url,filename};
        req.flash("success", "Listing Updated!");
        await newListing.save();

    }
    
    res.redirect(`/listings/${req.params.id}`);

 
};


module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
 let deletedListing =await  Listing.findByIdAndDelete(id);
 req.flash("success", "Listing Deleted!");
 res.redirect("/listings");
};