import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../../App";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./List.css";

const List = ({ token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [newImage, setNewImage] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (_id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    const product = list[index];
    setEditData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
    });
    setNewImage(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const saveEdit = async (productId) => {
    try {
      let imageUrl = list[editIndex].image[0]; // use existing image

      // Upload to Cloudinary if new image selected
      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "your_upload_preset"); // 🔁 Replace with actual preset

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // 🔁 Replace with your cloud name
          formData
        );
        imageUrl = cloudRes.data.secure_url;
      }

      const response = await axios.put(
        `${backendUrl}/api/product/update`,
        {
          _id: productId,
          ...editData,
          image: [imageUrl],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Product updated");
        setEditIndex(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="product-title">Product List</p>
      <div className="product-list-container">
        <div className="product-table-list">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="action-title">Action</b>
        </div>

        {list.map((item, index) => (
          <div className="product-row" key={item._id}>
            <img
              className="product-image"
              src={item.image[0] || ""}
              alt={item.name}
            />

            {editIndex === index ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="edit-input"
                />
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency} {item.price}
                </p>
              </>
            )}

            <div className="product-actions">
              {editIndex === index ? (
                <>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="edit-textarea"
                    placeholder="Edit description"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="edit-file-input"
                  />
                  <button
                    onClick={() => saveEdit(item._id)}
                    className="edit-save-btn"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <MdEdit
                    className="product-action"
                    onClick={() => startEditing(index)}
                  />
                  <MdDeleteForever
                    onClick={() => removeProduct(item._id)}
                    className="product-action"
                  />
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/edit-product/${item._id}`)}
                  >
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
