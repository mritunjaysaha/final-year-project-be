const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
            unique: true,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
            unique: true,
        },
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
