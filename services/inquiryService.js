const Inquiry = require("../models/Inquiry");

const createInquiry = async (data) => {
  try {
    const inquiry = new Inquiry(data);
    return await inquiry.save();
  } catch (error) {
   console.log(error)
    throw error; // important: pass error to controller
  }
};

module.exports = {
  createInquiry,
};
