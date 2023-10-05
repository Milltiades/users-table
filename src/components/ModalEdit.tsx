import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { updateModalEdit } from "@/store/editSlice";
import { User, submitEditUser } from "@/store/userSlice";

export default function ModalEdit() {
  const dispatch = useDispatch();
  const editingUserId = useSelector((state: any) => state.user.editingUserId);

  const [editedUser, setEditedUser] = useState<User>({
    id: editingUserId ?? -1,
    name: "",
    email: "",
    address: {
      city: "",
      street: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "email") {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else if (name === "city" || name === "street") {
      setEditedUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmitEdit = () => {
    console.log("editedUser", editedUser);
    if (editedUser.id !== -1) {
      dispatch(submitEditUser({ id: editedUser.id, updatedUser: editedUser }));
      setEditedUser({
        id: -1,
        name: "",
        email: "",
        address: { city: "", street: "" },
      });
    }
    dispatch(updateModalEdit({}));
  };

  return (
    <div className="modal-container">
      <div className="modal relative">
        <h1 className="mb-7 text-2xl">Edit user</h1>
        <button
          className="absolute top-3 right-3"
          onClick={() => dispatch(updateModalEdit({}))}
        >
          <Image src="/close.svg" alt="close" width={20} height={20} />
        </button>

        <div className="flex justify-between">
          <form onSubmit={handleSubmitEdit}>
            <input
              type="text"
              placeholder="name"
              className="mb-2 border-b-2"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="email"
              className="mb-2 border-b-2"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="address"
              className="mb-2 border-b-2"
              name="street"
              value={editedUser.address.street}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="city"
              className="mb-2 border-b-2"
              name="city"
              value={editedUser.address.city}
              onChange={handleInputChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
