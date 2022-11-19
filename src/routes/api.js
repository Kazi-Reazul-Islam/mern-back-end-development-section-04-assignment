const express = require("express");
const UserProfileControllers = require("../controllers/UserProfileControllers");
const UserManagingListController = require("../controllers/UserManagingListController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();

router.post("/CreateProfile", UserProfileControllers.CreateProfile);
router.post("/UserLogin", UserProfileControllers.UserLogin);

router.get("/SelectProfile",AuthVerifyMiddleware,UserProfileControllers.SelectProfile);
router.post("/UpdateProfile", AuthVerifyMiddleware,UserProfileControllers.UpdateProfile);

router.post("/CreateUserManagingList", AuthVerifyMiddleware,UserManagingListController.CreateUserManagingList);
router.post("/UpdateUserManagingList", AuthVerifyMiddleware,UserManagingListController.UpdateUserManagingList);
router.post("/DeleteUserManagingList", AuthVerifyMiddleware,UserManagingListController.DeleteUserManagingList);
router.get("/ReadUserManagingList", AuthVerifyMiddleware,UserManagingListController.ReadUserManagingList);

router.post("/UpdateUserManagingListStatus", AuthVerifyMiddleware,UserManagingListController.UpdateUserManagingListStatus);

router.post("/SearchUserManagingListByStatus", AuthVerifyMiddleware,UserManagingListController.SearchUserManagingListByStatus);

router.post("/FilterUserManagingListByDate", AuthVerifyMiddleware,UserManagingListController.FilterUserManagingListByDate);


module.exports = router;
