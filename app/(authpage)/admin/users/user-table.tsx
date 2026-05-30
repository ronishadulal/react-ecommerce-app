"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import axios from "axios"
import { useEffect, useState } from "react"

import EditUser from "./edit-user"
import DeleteUsers from "./deleteuser"

export default function UserTable() {
  const [user, setUsers] = useState<any[]>([])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/users"
      )
      setUsers(data)
    } catch (error) {
      console.log("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Avatar</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {user.map((users) => (
          <TableRow key={users.id}>
            <TableCell>{users.id}</TableCell>
            <TableCell>{users.email}</TableCell>
            <TableCell>{users.name}</TableCell>
            <TableCell>{users.role}</TableCell>

            {/* Avatar */}
            <TableCell>
              <img
                src={users.avatar}
                alt={users.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            </TableCell>

            {/* Actions (FIXED INSIDE TableCell) */}
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
                    <EditUser user={users} />
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <DeleteUsers user={users} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            Total Users: {user.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}