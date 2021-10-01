const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
        last_name: {
            type: String,
            maxlength: 32,
            trim: true,
        },
        username: { type: String },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        role: {
            type: Number,
            default: 0,
        },
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        exams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exam",
            },
        ],
        encrypted_password: {
            type: String,
            required: true,
        },
        salt: String,
    },
    { timestamps: true }
);

UserSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encrypted_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encrypted_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
