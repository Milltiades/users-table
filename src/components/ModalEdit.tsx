import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { updateModalEdit } from "@/store/editSlice";
import { cancelEditUser, startEditUser } from "@/store/userSlice";

export default function ModalEdit() {
  const dispatch = useDispatch();
  const modalChange = useSelector((state: boolean) => state);

  const handleEdit = (userId: number) => {
    dispatch(startEditUser(userId)); // Start editing the user with the given ID
  };
  const handleCancelEdit = () => {
    dispatch(cancelEditUser()); // Cancel editing the user
  };
  return (
    <div className="modal-container">
      <div className="modal relative">
        <h1 className=" mb-7 text-2xl">Edit user</h1>
        <button
          className=" absolute top-3 right-3"
          onClick={() => {
            handleCancelEdit();
            dispatch(updateModalEdit({}));
          }}
        >
          <Image src="/close.svg" alt="close" width={20} height={20} />
        </button>

        <div className=" flex justify-between">
          <form action="">
            <label htmlFor="" className="  ">
              <input
                type="text"
                placeholder="name"
                className="mb-2 border-b-2"
              />
              <input
                type="text"
                placeholder="email"
                className="mb-2 border-b-2"
              />
              <input
                type="text"
                placeholder="address"
                className="mb-2 border-b-2"
              />
              <input
                type="text"
                placeholder="city"
                className="mb-2 border-b-2"
              />
            </label>
            <input type="submit" onClick={() => window.location.reload()} />
          </form>
        </div>
      </div>
    </div>
  );
}
