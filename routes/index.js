const router = require("express").Router();
router.use("/members", require("./members"));
router.use("/employees", require("./employees"));
router.use("/machines", require("./machines"));
router.use("/locations", require("./locations"));
router.use("/", require("./swagger"));
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
