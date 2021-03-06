const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/User");
const UserAnswer = require("../models/UserAnswer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const auth = require("../middleware/auth");
const {
  sendWelcomeEmail,
  sendCancelationEmail,
  sendResetLink
} = require("../emails/account");
const router = new express.Router();

router.post("/users/register", async (req, res) => {
  console.log({ ...req.body });
  try {
    const user = new User({ ...req.body.user });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ e });
  }
});

router.post("/users/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/isAdmin", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.isAdmin);
    if (user.isAdmin) {
      return res.send({ isAdmin: true });
    }
    return res.send({ isAdmin: false });
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).poulate("school_id");

    res.send(user);
  } catch (e) {
    res.status(404).send();
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("school_id");
    res.send(users);
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const email = req.body.email;
    const url = req.body.url;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const resetToken = await jwt.sign({ email }, "cxjhczjxkzx", {
        expiresIn: "1h"
      });
      console.log({ resetToken });
      const link = url.host + "/resetPassword/" + resetToken;
      sendResetLink(email, link);
      return res.send({ resetToken });
    }
    return res.send({ message: "user not found" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/resetPassword/:resetToken", async (req, res) => {
  try {
    const resetToken = req.params.resetToken;
    const password = req.body.password;
    const email = jwt.decode(resetToken).email;
    const user = await User.findOne({ email });
    if (user) {
      const hashed = await bcrypt.hash(password, 8);
      console.log(hashed);
      await User.findOneAndUpdate({ email }, { password: hashed });
      return res.send({ user });
    }
    return res.send({ message: "user not found" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
