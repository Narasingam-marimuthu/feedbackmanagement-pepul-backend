const router = require("express").Router();
const multer = require("../multer");
const {
    addFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback} = require("../controller/feedbackcontroller"); 
router.route("/").get(getFeedback).post( multer.single('attachment'),addFeedback);
router.route("/:id").get(getFeedbackById).put( multer.single('attachment'),updateFeedback).delete(deleteFeedback);

module.exports = router;