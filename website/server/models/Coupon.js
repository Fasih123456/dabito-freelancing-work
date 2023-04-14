const db = require("../util/database");

module.exports = class Coupon {
  constructor(coupon_code, discount_type, discount_amount) {
    this.couponid = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
    this.coupon_code = coupon_code;
    this.discount_type = discount_type;
    this.discount_amount = discount_amount;
  }

  save() {
    return db.execute(
      "INSERT INTO coupons (couponid, coupon_code, discount_type, discount_amount) VALUES (?, ?, ?, ?)",
      [this.couponid, this.coupon_code, this.discount_type, this.discount_amount]
    );
  }

  static updateCoupon(coupon_code, discount_type, discount_amount) {
    return db.execute(
      "UPDATE coupons SET discount_type = ?, discount_amount = ? WHERE coupon_code = ?",
      [discount_type, discount_amount, coupon_code]
    );
  }

  static deleteCoupon(couponid) {
    return db.execute("DELETE FROM coupons WHERE couponid = ?", [couponid]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM coupons");
  }
};
