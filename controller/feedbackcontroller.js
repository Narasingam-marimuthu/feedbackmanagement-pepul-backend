const {
    addFeedBack,
    getAllFeedBack,
    getFeedBackById,
    updateFeedBack,
    deleteFeedBack
  } = require("../models/feedbackmodels");
  
  const addFeedback = async (req, res) => {
    try {
      console.log("addFeedback", req.body);  
      console.log("Uploaded File:", req.file);
  
      const feedback = req.body;  
  
      if (req.file) {
        feedback.attachment = req.file.path; 
      }
  
      const result = await addFeedBack(feedback);
      if (result.success) {
        res.status(200).json({
          message:  result.message || "Feedback added successfully",
          success: true,
          data: result.data,
        });
      } else {
        res.status(400).json({
          message: "Feedback not added",
          success: false,
          data: result.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: error,
      });
    }
  };
  
  const getFeedback = async (req, res) => {
    try {
      console.log("getFeedback");
      const result = await getAllFeedBack();
      if (result.success) {
        result.data.forEach(feedback => {
            if (feedback.attachment) {
              feedback.attachment = `${process.env.BASE_URL}/${feedback.attachment}`; // Use BASE_URL in the .env file for the server URL
            }
          });
        res.status(200).json({
          message: "Feedback fetched successfully",
          success: true,
          data: result.data,
        });
      } else {
        res.status(400).json({
          message: "Feedback not fetched",
          success: false,
          data: result.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: error,
      });
    }
  };
  
  const getFeedbackById = async (req, res) => {
    try {
      console.log("getFeedbackById");
      const result = await getFeedBackById(req.params.id);
      if (result.success) {
        result.data.forEach(feedback => {
            if (feedback.attachment) {
              feedback.attachment = `${process.env.BASE_URL}/${feedback.attachment}`; 
            }  
        })
        res.status(200).json({
          message: "Feedback fetched successfully",
          success: true,
          data: result.data,
        });
      } else {
        res.status(400).json({
          message: "Feedback not fetched",
          success: false,
          data: result.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: error,
      });
    }
  };
  
  const updateFeedback = async (req, res) => {
    try {
      console.log("updateFeedback");
      
      const feedback = req.body; 
      
      if (req.file) {
        feedback.attachment = req.file.path;  
      }
      const result = await updateFeedBack(req.params.id, feedback);
      if (result.success) {
        res.status(200).json({
          message: "Feedback updated successfully",
          success: true,
          data: result.data,
        });
      } else {
        res.status(400).json({
          message: "Feedback not updated",
          success: false,
          data: result.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: error,
      });
    }
  };
  
  const deleteFeedback = async (req, res) => {
    try {
      console.log("Delete Feedback");
      const result = await deleteFeedBack(req.params.id);
      if (result.success) {
        res.status(200).json({
          message: "Feedback deleted successfully",
          success: true,
          data: result.data,
        });
      } else {
        res.status(400).json({
          message: "Feedback not deleted",
          success: false,
          data: result.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: error,
      });
    }
  };
  
  module.exports = {
    addFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
  };
  