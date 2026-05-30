"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

const EditProducts = ({ product }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImage(product.images?.[0] || "");
    }
  }, [product]);

  const EditProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        {
          title,
          price,
          images: [image],
        }
      );

      console.log(data);
      alert("Product Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={EditProduct} className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProducts;