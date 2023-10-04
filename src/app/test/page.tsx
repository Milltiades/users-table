"use client";

// UserTable.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  startEditUser,
  cancelEditUser,
  submitEditUser,
  User,
} from "../../store/userSlice";

const UserTable: React.FC = () => {
  const users: User[] = useSelector((state: any) => state.user.users);
  const status: string = useSelector((state: any) => state.user.status);
  const error: string | null = useSelector((state: any) => state.user.error);
  const editingUserId: number | null = useSelector(
    (state: any) => state.user.editingUserId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      //   dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (userId: number) => {
    dispatch(startEditUser(userId)); // Start editing the user with the given ID
  };

  const handleCancelEdit = () => {
    dispatch(cancelEditUser()); // Cancel editing the user
  };

  const [editedUser, setEditedUser] = useState<User>({
    id: -1, // Set an initial value for the ID
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmitEdit = () => {
    if (editedUser.id !== -1) {
      dispatch(submitEditUser({ id: editedUser.id, updatedUser: editedUser }));
      setEditedUser({ id: -1, name: "", email: "" }); // Reset the editedUser state
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {editingUserId === user.id ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingUserId === user.id ? (
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingUserId === user.id ? (
                <button onClick={handleSubmitEdit}>Submit</button>
              ) : (
                <>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </>
              )}
              {editingUserId === user.id && (
                <button onClick={handleCancelEdit}>Cancel</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
