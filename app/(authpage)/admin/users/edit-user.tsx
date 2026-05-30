import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from "axios"
import { useEffect, useState } from "react"

const EditUsers = ({ user }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
      setAvatar(user.avatar)
    }
  }, [user])

  const editUser = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        {
          name,
          email,
          role,
          avatar,
        }
      )

      console.log(data)
      alert("User Updated Successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={editUser} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Avatar URL</Label>
            <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUsers