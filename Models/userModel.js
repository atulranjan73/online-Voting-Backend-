const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    default: () => new mongoose.Types.ObjectId().toString() // Ensures _id is stored as a string
  },
  candidate: {
    type: String,
    required: [true, "कृपया एक उम्मीदवार चुनें"],
    enum: {
      values: ["देवेश कांत सिंह (BJP)", "हन्नी वर्मा (RJD)", "इसमें से कोई नहीं"],
      message: "कृपया दिए गए विकल्पों में से एक वैध उम्मीदवार चुनें",
    },
  },
  villageName: {
    type: String,
    required: [true, "कृपया गाँव का नाम दर्ज करें"],
    trim: true,
    minlength: [2, "गाँव का नाम कम से कम 2 अक्षर का होना चाहिए"],
    maxlength: [20, "गाँव का नाम 20 अक्षरों से अधिक नहीं हो सकता"],
  },
  mobileNumber: {
    type: String,
    required: [true, "कृपया मोबाइल नंबर दर्ज करें"],
    match: [/^[0-9]{10}$/, "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें"],
    unique: true,
    index: true, // तेज़ खोज के लिए इंडेक्स जोड़ना
  },
  hasVoted: {
    type: Boolean,
    default: true, // जब मतदान दर्ज किया जाता है, तो इसे true पर सेट करें
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure `_id` is always returned as a string in JSON responses
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    return ret;
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
