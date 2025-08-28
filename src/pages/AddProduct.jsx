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
} from "../components/ui/select"





const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    latest: false,
  });

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


  const handleSubmit = (e) => {
    e.preventDefault();
  
   
  };

  return (
    <motion.div
      className="min-h-screen  flex items-center justify-center p-6 bg-gray-100"
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
              <Label className="text-gray-700  my-4">Product Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="bg-white text-gray-800 border-gray-300 focus:border-black"
              />
            </div>

            
            <div>
              <Label className="text-gray-700  my-4">Description</Label>
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
              <Label className="text-gray-700  my-4">Price (₹)</Label>
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
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem  value="women">Women</SelectItem>
                          <SelectItem value="men">Men's</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>


            </div>

            <div>
              <Label  className="text-gray-700 my-4">Upload Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-white  text-gray-800 border-gray-300 focus:border-black"
              />
              {form.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {form.images.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center  my-4 gap-3">
              <Switch
                checked={form.latest}
                onCheckedChange={(val) =>
                  setForm({ ...form, latest: val })
                }
              />
              <Label className="text-gray-700">Mark as Latest</Label>
            </div>

           
            <Button
              type="submit"
              className="w-full  bg-black hover:bg-gray-800 text-white rounded-xl py-2"
            >
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddProduct;
