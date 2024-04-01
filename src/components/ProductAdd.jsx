import React, { useState } from "react";

const ProductAdd = () => {
  // add
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    oldPrice: "",
    image: null,
  });

  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { name, desc, price, oldPrice, image } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("desc", desc);
      formDataToSend.append("price", price);
      formDataToSend.append("oldPrice", oldPrice);
      formDataToSend.append("image", image);

      const response = await fetch(
        "https://containers-backend.onrender.com/api/product/add/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

    // Reset form after submission
    setFormData({
      name: "",
      desc: "",
      price: "",
      oldPrice: "",
      image: null,
    });
  };

  return (
    <>
      <h1>Mahsulot qo'shish</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="container mt-4">
          <div className="form-group">
            <label htmlFor="name">Nomi:</label>
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
            <label htmlFor="desc">Tavsif:</label>
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

          <select required name="" id="">
            <option value="">Yuk tashuvchi konteyner</option>
            <option value="">Saqlovchi konteyner</option>
          </select>

          <div className="form-group">
            <label htmlFor="price">Narxi:</label>
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
            <label htmlFor="oldPrice">Eski Narxi:</label>
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

          <div className="form-group my-4">
            <label htmlFor="image">Rasm: </label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Qo'shish
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductAdd;
