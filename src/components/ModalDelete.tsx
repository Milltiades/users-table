import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "@/store/modalSlice";
import { deleteUser } from "@/store/userSlice";

export default function ModalDelete() {
  const dispatch = useDispatch();

  const userIdnow = useSelector((store: any) => store.userid.value);

  const handleDelete = (userId: any) => {
    dispatch(deleteUser(userId));
    setTimeout(() => {
      alert("User deleted successfully");
    }, 1000);
  };
  return (
    <div className="modal-container">
      <div className="modal relative">
        <h1 className=" mb-7 text-2xl">Delete user?</h1>
        <button
          className=" absolute top-3 right-3"
          onClick={() => dispatch(updateModal({}))}
        >
          <Image src="/close.svg" alt="close" width={20} height={20} />
        </button>

        <div className=" flex justify-between">
          <button
            className=" text-green-500"
            onClick={() => {
              handleDelete(userIdnow);
              dispatch(updateModal({}));
            }}
          >
            Yes
          </button>
          <button
            className=" text-red-500"
            onClick={() => {
              dispatch(updateModal({}));
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
