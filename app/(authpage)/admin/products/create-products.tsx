"use client"
import axios from "axios";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Create Product
  const createProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://api.escuelajs.co/api/v1/products",
        {
          title: title,
          price: Number(price),
          description: "Awesome product",
          categoryId: 1,
          images: [image],
        }
      );

      console.log(data);

      alert("Product Created Successfully");

      // Clear fields
      setTitle("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      {/* Open Button */}
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>

          <DialogDescription>
            Add new product details below.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={createProduct}
          className="space-y-4"
        >
          {/* Product Name */}
          <div className="space-y-2">
            <Label>Product Name</Label>

            <Input
              placeholder="Enter product name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price</Label>

            <Input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label>Image URL</Label>

            <Input
              placeholder="Enter image URL"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" >
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProducts;