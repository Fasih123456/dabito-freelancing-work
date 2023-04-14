const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
require("dotenv").config();

//This class handles all coupon related routes

router.post("/createCoupon", (req, res, next) => {
  console.log(req.body);

  let couponId = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(couponId);

  const coupon = new Coupon(req.body.couponCode, req.body.discount_type, req.body.discount_amount);

  console.log(coupon);

  coupon.save();
  res.status(200).json({ message: "Coupon created successfully" });
});

router.get("/getAllCoupons", (req, res, next) => {
  Coupon.fetchAll().then(([rows, fieldData]) => {
    console.log(rows);
    res.status(200).json(rows);
  });
});

router.put("/editCoupon", (req, res, next) => {
  console.log(req.body);

  Coupon.updateCoupon(req.body.couponCode, req.body.discount_type, req.body.discount_amount);

  res.status(200).json({ message: "Coupon edited successfully" });
});

router.delete("/deleteCoupon/:couponid", (req, res, next) => {
  console.log(req.params.couponid);

  Coupon.deleteCoupon(req.params.couponid);

  res.status(200).json({ message: "Coupon deleted successfully" });
});

router.get("/api/coupons/:couponCode", (req, res, next) => {
  const couponCode = req.params.id;

  Coupon.fetchAll().then(([rows, fieldData]) => {
    console.log(rows);
    let coupon = rows.find((coupon) => coupon.coupon_code === couponCode);
    console.log(coupon);
    res.status(200).json(coupon);
  });
});

module.exports = router;
