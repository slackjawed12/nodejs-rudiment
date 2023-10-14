import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("user router called");
  res.send("Hello, User");
});

export default router;
