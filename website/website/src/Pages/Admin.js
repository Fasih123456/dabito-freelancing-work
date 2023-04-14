import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { myContext } from "../Components/OAuthContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal, Form, InputGroup } from "react-bootstrap";

function Admin() {
  const userObject = useContext(myContext);
  const [addShow, setAddShow] = useState(false);
  const [discountType, setDiscountType] = useState("Flat");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [editShow, setEditShow] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/getAllCoupons`).then((response) => {
      setCoupons(response.data);
    });
  }, []);

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  const handleEditClose = () => setEditShow(false);

  const handleAddSave = () => {
    axios.post(`http://localhost:3001/createCoupon`, {
      couponCode: couponCode,
      discount_type: discountType,
      discount_amount: discountAmount,
    });
    setAddShow(false);
  };

  const handleEditShow = (coupon) => {
    setDiscountType(coupon.discount_type);
    setDiscountAmount(coupon.discount_amount);
    setEditShow(true);
  };

  const handleEditSave = () => {
    axios.put("http://localhost:3001/editCoupon", {
      couponCode: couponCode,
      discount_type: discountType,
      discount_amount: discountAmount,
    });
    setEditShow(false);
  };

  const handleDelete = (coupon) => {
    axios.delete(`http://localhost:3001/deleteCoupon/${coupon.couponid}`);
  };

  function handleEdit(coupon) {
    setCouponCode(coupon.coupon_code);
    setDiscountType(coupon.discount_type);
    setDiscountAmount(coupon.discount_amount);
    setEditShow(true);
  }

  return (
    <div>
      <main id="main">
        <h1>Admin</h1>
        <Button onClick={handleAddShow} style={{ width: "70vw" }}>
          Add Coupon
        </Button>
        <table style={{ width: "70vw" }}>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount Type</th>
              <th>Discount Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.couponid}>
                <td>{coupon.coupon_code}</td>
                <td>{coupon.discount_type}</td>

                {coupon.discount_type === "Flat" ? (
                  <td>$ADA{coupon.discount_amount}</td>
                ) : (
                  <td>{coupon.discount_amount}%</td>
                )}

                <td>
                  <Row>
                    <Col>
                      <Button variant="danger" onClick={() => handleDelete(coupon)}>
                        Delete
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={() => handleEdit(coupon)} variant="info">
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Modal show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="couponCode">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                autoFocus
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="discountType">
              <Form.Label>Discount Type</Form.Label>
              <Form.Select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="Flat">Flat</option>
                <option value="Percentage">Percentage</option>
              </Form.Select>
            </Form.Group>
            {discountType === "Flat" && (
              <Form.Group className="mb-3" controlId="discountAmount">
                <Form.Label>Discount Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount amount"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                />
              </Form.Group>
            )}
            {discountType === "Percentage" && (
              <Form.Group className="mb-3" controlId="discountAmount">
                <Form.Label>Discount Amount: {discountAmount}%</Form.Label>
                <Form.Range
                  min="0"
                  max="100"
                  defaultValue="0"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="discountType">
              <Form.Label>Discount Type</Form.Label>
              <Form.Select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="Flat">Flat</option>
                <option value="Percentage">Percentage</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="discountAmount">
              <Form.Label>Discount Amount</Form.Label>
              {discountType === "Flat" ? (
                <InputGroup>
                  <InputGroup.Text>$ADA</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                </InputGroup>
              ) : (
                <InputGroup>
                  <Form.Control
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin;
