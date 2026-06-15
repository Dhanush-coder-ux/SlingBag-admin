import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { netWorkCalls } = useNetWorkCalls();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    latest: false,
  });
  
  const [existingImages, setExistingImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await netWorkCalls({
          method: "get",
          path: `/products/${id}`,
          ignoreCookie: true
        });
        if (res && res.product) {
          const p = res.product;
          setForm({
            title: p.title || "",
            description: p.description || "",
            price: p.price || "",
            category: p.category || "",
            latest: p.is_latest || false,
          });
          setExistingImages(p.image_urls || []);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("is_latest", form.latest);

    setIsLoading(true);

    try {
      const res = await netWorkCalls({
        method: "put",
        path: "/product",
        data: formData,
        isForForm: true,
      });
      console.log("Product updated successfully:", res);
      alert("Product updated successfully!");
      navigate('/list');
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-10 text-center">Loading product data...</div>;
  }

  return (
    <motion.div
      className="flex items-center justify-center m-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Edit Product
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
                required
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
                required
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
                required
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
              <Label className="text-gray-700 my-4">Existing Images (Read-Only)</Label>
              {existingImages.length > 0 ? (
                <div className="grid grid-cols-8 gap-y-2 py-4 max-sm:grid-cols-4 mt-2">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative w-16 h-16">
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-full rounded-lg object-cover border border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No images available.</p>
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
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditProduct;
