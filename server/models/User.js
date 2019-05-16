const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
const bcryptjs = require("bcryptjs");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    provider: {
      type: String
    },
    role: {
      type: Number,
      required: true,
      default: 0,
      enum: [0, 1, 2]
    },
    username: {
      type: String,
      lowercase: true,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Number,
      default: 0
    },
    referal_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    }
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, { deletedAt: true });

userSchema.statics.hashPassword = async function(password) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(password, salt);
    password = passwordHash;
    return password;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    const match = await bcryptjs.compare(newPassword, this.password);
    console.log(match);
    return match;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = User = mongoose.model("users", userSchema);
