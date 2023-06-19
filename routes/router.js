const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

// const postUser = require("../controllers/user/post");
const getUsers = require("../controllers/user/getAll");
// const editUser = require("../controllers/user/editOne");

const postReport = require("../controllers/report/post");
const getReports = require("../controllers/report/getAll");
const getReport = require("../controllers/report/getOne");
const editReport = require("../controllers/report/editOne");

const postSign = require("../controllers/auth/postSign");
const postLogin = require("../controllers/auth/postLogin");
const logout = require("../controllers/auth/logout");

const router = Router();

// USER
router.get("/user", requireAuth, getUsers);
// router.patch("/user/:id", requireAuth, editUser);

// REPORT
router.post("/report", requireAuth, postReport);
router.get("/report", requireAuth, getReports);
router.get("/report/:id", requireAuth, getReport);
router.patch("/report/:id", requireAuth, editReport);

// SIGN
router.post("/sign-up", postSign);
router.post("/login", postLogin);
router.get("/logout", requireAuth, logout);

module.exports = router;
