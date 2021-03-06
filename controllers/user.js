const { User } = require("../models/user");
const formidable = require("formidable");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found in DB",
            });
        }
        req.profile = user;

        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypted_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No users found in DB",
            });
        }

        return res.json(users);
    });
};

exports.getPopulatedCourses = (req, res) => {
    User.findById(req.profile._id)
        .populate("courses")
        .exec((err, user) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: "Failed to populate courses", msg: err });
            }

            return res.json(user.courses);
        });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            user.salt = undefined;
            user.encrypted_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;

            return res.json(user);
        }
    );
};

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.profile._id)
        .then((res) => res.json({ message: "successfully deleted" }))
        .catch((err) =>
            res
                .status(400)
                .json({ error: "failed to delete user", message: err.message })
        );
};

exports.updateUserPhoto = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image",
            });
        }

        let profile = req.profile;

        profile.photo.data = fields.photo;
        profile.photo.contentType = "image/jpeg";

        User.findByIdAndUpdate(
            { _id: req.profile._id },
            {
                $set: {
                    photo: profile.photo,
                },
            },
            { new: true },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Not authorized to update information",
                    });
                }

                user.salt = undefined;
                user.encrypted_password = undefined;
                user.createdAt = undefined;
                user.updatedAt = undefined;

                return res.json({ photo: user.photo.data });
            }
        );
    });
};

exports.getPhoto = (req, res) => {
    const { username } = req.params;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(404).json({ error: "User not found" });
        }

        res.json({ photo: user.photo.data });
    });
};

exports.deletePhoto = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: { photo: "" } },
        { new: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            res.json(user);
        }
    );
};
