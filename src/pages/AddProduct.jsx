import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNetWorkCalls } from "../Utils/NetworkCalls";

const AddProduct = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const { netWorkCalls } = useNetWorkCalls();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    latest: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("is_latest", form.latest);
    form.images.forEach((image) => {
      formData.append("images", image);
    });

    setIsLoading(true);

    try {
      const res = await netWorkCalls({
        method: "post",
        path: "/product",
        data: formData,
        isForForm: true,
      });
      console.log("Product added successfully:", res);
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
        latest: false,
      });
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center m-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-700 my-4">Product Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="bg-white text-gray-800 border-gray-300 focus:border-black"
              />
            </div>

            <div>
              <Label className="text-gray-700 my-4">Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="bg-white text-gray-800 border-gray-300 focus:border-black"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-gray-700 my-4">Price (₹)</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="2499"
                className="bg-white text-gray-800 border-gray-300 focus:border-black"
              />
            </div>

            <div>
              <Label className="text-gray-700 my-4">Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm({ ...form, category: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700 my-4">Upload Images</Label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    id="file-upload"
  />

  {/* Custom button to trigger input */}
  <label
    htmlFor="file-upload"
    className="px-4 py-2  bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800"
  >
    Choose Images
  </label>
              {form.images.length > 0 && (
                <div className="grid grid-cols-8 gap-y-2 py-4 g max-sm:grid-cols-4 mt-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-16">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full rounded-lg object-cover border border-gray-300"
                      />
                      {/* X button */}
                      <button
                        type="button"
                        className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg hover:bg-red-700 transition"
                        onClick={() => handleRemoveImage(i)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center my-4 gap-3">
              <Switch
                checked={form.latest}
                onCheckedChange={(val) => setForm({ ...form, latest: val })}
              />
              <Label className="text-gray-700">Mark as Latest</Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black hover:bg-gray-800 text-white rounded-xl py-2 flex justify-center items-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddProduct;
