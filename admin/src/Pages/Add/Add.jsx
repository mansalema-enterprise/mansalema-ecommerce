import React from "react";
import upload_img from "../../assets/upload_img.png";
import { useState } from "react";
import "./Add.css";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescrption] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Accessories");
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestSeller", bestSeller);

      image1 && formData.append("image1", image1 ? image1 : null);
      image2 && formData.append("image2", image2 ? image2 : null);
      image3 && formData.append("image3", image3 ? image3 : null);
      image4 && formData.append("image4", image4 ? image4 : null);

      console.log("Token being sent:", token);
      

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // DO NOT set Content-Type here; let Axios handle it automatically
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescrption("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="form-container">
      <div>
        <p className="form-label">Upload Images</p>
        <div className="image-upload-container">
          <label htmlFor="image1">
            <img
              src={!image1 ? upload_img : URL.createObjectURL(image1)}
              alt=""
              className="upload-preview"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? upload_img : URL.createObjectURL(image2)}
              alt=""
              className="upload-preview"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? upload_img : URL.createObjectURL(image3)}
              alt=""
              className="upload-preview"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? upload_img : URL.createObjectURL(image4)}
              alt=""
              className="upload-preview"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
        <div className="form-group">
          <p className="form-label">Product Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter product name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <p className="form-label">Product Description</p>
          <textarea
            onChange={(e) => setDescrption(e.target.value)}
            value={description}
            placeholder="Type product description"
            className="form-input"
            required
          />
        </div>
        <div className="form-group-horizontal">
          <div>
            <p className="form-label">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="form-select"
            >
              <option value="Salema">Salema</option>
              <option value="Self-Defence">Self-Defence</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>
        <div>
          <p className="form-label">Product Price</p>
          <input
            type="number"
            className="form-input price-input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="30"
          />
        </div>
        <div>
          <div className="checkbox-group">
            <input
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestSeller}
              type="checkbox"
              id="bestseller"
            />
            <label htmlFor="bestseller" className="check">
              Add to bestseller
            </label>
          </div>
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default Add;
