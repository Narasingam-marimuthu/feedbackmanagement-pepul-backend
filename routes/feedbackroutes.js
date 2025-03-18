const router = require("express").Router();
const multer = require("../multer");
const {
  feedbackSchema,
  feedBackParams,
} = require("../validations/feedbackSchema");
const { validateBody, validateParams } = require("../helper/validationHelper");
const {
  addFeedback,
  getFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controller/feedbackcontroller");
router
  .route("/")
  .get(getFeedback)
  .post(
    multer.single("attachment"),
    validateBody(feedbackSchema),
    addFeedback
  );
router
  .route("/:id")
  .get(validateParams(feedBackParams), getFeedbackById)
  .put(
    multer.single("attachment"),
    validateParams(feedBackParams),
    validateBody(feedbackSchema),
    updateFeedback
  )
  .delete(validateParams(feedBackParams), deleteFeedback);

module.exports = router;
