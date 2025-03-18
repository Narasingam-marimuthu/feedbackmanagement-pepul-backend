const db = require("../db");

module.exports = {
  addFeedBack: async (feedback) => {
    try {
      console.log(feedback, "feedback");

      const exists = await db(process.env.FEED_BACK)
        .where({
          title: feedback.title,
        })
        .first();

      if (exists) {
        return {
          success: false,
          data: [],
          message: "Feedback already exists",
        };
      }
      const getQuery = await db(process.env.FEED_BACK)
        .insert(feedback)
        .returning("*");
      if (getQuery) {
        return {
          success: true,
          data: getQuery[0],
        };
      } else {
        return {
          success: false,
          data: [],
        };
      }
    } catch (error) {
      throw new Error("Internal server error " + error);
    }
  },
  getAllFeedBack: async () => {
    try {
      const getQuery = await db(process.env.FEED_BACK).where(
        "deleted_at",
        null
      );
      if (getQuery && getQuery.length > 0) {
        return {
          success: true,
          data: getQuery,
        };
      } else {
        return {
          success: false,
          data: [],
        };
      }
    } catch (error) {
      throw new Error("Internal server error " + error);
    }
  },
  getFeedBackById: async (id) => {
    try {
      const getQuery = await db(process.env.FEED_BACK).select("*").where({
        id: id,
        deleted_at: null,
      }).first();
      if (getQuery) {
        return {
          success: true,
          data: getQuery,
        };
      } else {
        return {
          success: false,
          data: [],
        };
      }
    } catch (error) {
      throw new Error("Internal server error " + error);
    }
  },
  updateFeedBack: async (id, feedback) => {
    try {
      console.log(feedback, "feedback",id);
      
      const updateQuery = await db(process.env.FEED_BACK)
        .where({ id: id, deleted_at: null })
        .update(feedback).returning("*");
      if (updateQuery) {
        return {
          success: true,
          data: updateQuery[0],
        };
      } else {
        return {
          success: false,
          data: {},
        };
      }
    } catch (error) {
      throw new Error("Internal server error " + error);
    }
  },
  deleteFeedBack: async (id) => {
    try {
      const query = await db(process.env.FEED_BACK)
        .update({
          deleted_at: db.fn.now(),
        })
        .where("id", id);
      console.log(query, "query");

      if (query) {
        return {
          success: true,
          data: { id: id },
        };
      } else {
        return {
          success: false,
          data: {},
        };
      }
    } catch (error) {
      throw new Error("Internal server error " + error);
    }
  },
};
