import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import axios from "axios";
import { toast } from "react-hot-toast";

function NewProduct() {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, image, price } = data;

    if (name && category && image && price) {
      try {
        const response = await axios.post(
          "http://localhost:8080/newProduct",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataRes = response.data;
        toast(dataRes.message);

        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
          };
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("Enter Required Feield");
    }
  };
  return (
    <div className="p-4 ">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>Vegetables</option>
          <option value={"icecream"}>IceCream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"chinese"}>Chinese</option>
          <option value={"panjabi"}>Panjabi</option>
          <option value={"gujarati"}>Gujarati</option>
          <option value={"fastfood"}>FastFood</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full " alt="" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <label className="my-1" htmlFor="price">
          price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleOnChange}
          name="description"
          rows={2}
          value={data.description}
        ></textarea>

        <button className="bg-blue-300 hover:bg-blue-700 text-white text-lg font-bold drop-shadow my-2 ">
          Save
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
