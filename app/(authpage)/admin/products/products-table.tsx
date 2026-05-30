'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProducts from "./edit-product";
import DeleteProducts from "./deleteProduct";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Run on page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* Top Heading */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage your store products
          </p>
        </div>

        <Button>Add Product</Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                {/* Image */}
                <TableCell>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                </TableCell>

                {/* Product Name */}
                <TableCell className="font-medium max-w-[250px] truncate">
                  {product.title}
                </TableCell>

                {/* Category */}
                <TableCell>
                  {product.category?.name}
                </TableCell>

                {/* Price */}
                <TableCell>
                  ${product.price}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                     <DropdownMenuItem asChild>
  <EditProducts product={product} />
</DropdownMenuItem>


                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild >
                       <DeleteProducts product={product}/>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;