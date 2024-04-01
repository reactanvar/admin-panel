import React, { useState } from "react";

const EditProduct = ({ product, setProduct, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    desc: product.desc,
    price: product.price,
    oldPrice: product.oldPrice,
  });

  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // edit
  const handleEdit = async (event, id) => {
    event.preventDefault();

    setLoading(true);

    try {
      const formDataToSend = {
        name: formData.name,
        desc: formData.desc,
        price: formData.price,
        oldPrice: formData.oldPrice,
      };

      const response = await fetch(
        "https://containers-backend.onrender.com/api/product/update/" + id,
        {
          method: "PATCH",
          body: JSON.stringify(formDataToSend),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }

    // Reset form after submission
    setFormData({
      name: "",
      desc: "",
      price: "",
      oldPrice: "",
    });

    setProduct(null);
  };

  //   on Close

  const onClose = () => {
    setProduct(null);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        maxWidth: "600px",
        transform: "translate(-50%,-50%)",
        background: "#ddd",
        padding: "20px",
        borderRadius: "8px",
      }}
      className="container"
    >
      <form onSubmit={(e) => handleEdit(e, product.id)} className="container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <textarea
            className="form-control"
            id="desc"
            name="desc"
            rows="4"
            value={formData.desc}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="oldPrice">Old Price:</label>
          <input
            type="text"
            className="form-control"
            id="oldPrice"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary mt-4   "
        >
          Edit Product
        </button>

        <button
          onClick={onClose}
          type="button"
          className="btn btn-danger mt-4 "
          style={{ marginLeft: "5px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
