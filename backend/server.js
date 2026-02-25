import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

import configureDb from "./config/db.js";
configureDb();

import UserController from "./app/controllers/user-controller.js";
import volunteerController from "./app/controllers/volunteer-controller.js";
import { authenticateUser } from "./app/middleware/authenticate-user.js";
import { authorizeUser } from "./app/middleware/autherize-user.js";

// user routes
app.post("/user/register", UserController.register);
app.post("/user/login", UserController.login);
app.get("/user/profile", authenticateUser, UserController.profile);

// volunteer routes
app.post(
  "/volunteer/register",
  authenticateUser,
  authorizeUser(["user"]),
  volunteerController.registerVolunteer,
);
app.get(
  "/volunteer/all",
  authenticateUser,
  authorizeUser(["admin"]),
  volunteerController.getAllVolunteers,
);
app.get(
  "/volunteer/profile",
  authenticateUser,
  authorizeUser(["volunteer", "user"]),
  volunteerController.getMyProfile,
);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
