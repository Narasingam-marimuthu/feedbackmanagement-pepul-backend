const db = require("../db");

module.exports = {

    addFeedBack: async (feedback) => {
        try {

            const exists = await db(process.env.FEED_BACK).where({
                title: feedback.title,
                platform: feedback.platform,
                module: feedback.module,
            }).first();

            if (exists) {
                return {
                    success: false,
                    data: [],
                    message: "Feedback already exists",
                };
            }
          const getQuery = await db(process.env.FEED_BACK)
            .insert(feedback)
            .returning("id");
          if (getQuery) {
            return {
              success: true,
              data: getQuery.id,
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
      const getQuery = await db(process.env.FEED_BACK).where({
        id: id,
        deleted_at: null,
      });
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
  updateFeedBack: async (id, feedback) => {
    try {
      const updateQuery = await db(process.env.FEED_BACK)
        .where({ id: id, deleted_at: null })
        .update(feedback);
      if (updateQuery) {
        return {
          success: true,
          data: {},
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
        console.log(query,"query");
        
      if (query) {
        return {
          success: true,
          data: {},
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
