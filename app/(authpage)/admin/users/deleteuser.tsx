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

const DeleteUsers = ({ user }) => {

 

  const DeleteUser = async (e) => {
    e.preventDefault();
    

    try {
      const { data } = await axios.delete(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
      );

      console.log(data);
      alert("User Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
          Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={DeleteUser} className="space-y-4">

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUsers;