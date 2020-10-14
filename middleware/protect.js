const express = require("express");
const jwt = require("jsonwebtoken");
const SALT = process.env.SALT;
function protect(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(200).json({ error: "no token" });
  }
  jwt.verify(token, SALT, (error, payload) => {
    if (error) {
      console.log("error");
      return res.status(200).json({ error });
    }
    if (!payload) {
      console.log("eRRor");

      return res.status(200).json({ error });
    }
    req.user = payload;
    next();
  });
}
module.exports = protect;
