"use client";

import * as React from "react";
import Link from "next/link";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Loading from "./loading";

export type Payment = {
  id: any;
  name: string;
  address: {
    city: string;
  };
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "address.city",
    header: () => <div>Address</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;
      // const usersArray = useSelector((store: any) => store.users);
      const dispatch = useDispatch<any>();

      const handleDelete = (userId: any) => {
        dispatch(deleteUser(userId));
      };

      const handleEdit = (userId: any) => {
        dispatch(startEditUser(userId));
      };
      const handleCancelEdit = () => {
        dispatch(cancelEditUser());
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => navigator.clipboard.writeText(payment.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/${row.id}`}> View customer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => {
                console.log("edit:", payment.id);
                // dispatch(updateModalEdit({}));
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => {
                dispatch(updateModal({}));
                dispatch(getUserId(payment.id));
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   id: "edit",
  //   enableHiding: false,
  //   cell: ({ row }) => (
  //     <button
  //       className="text-blue-500 cursor-pointer"
  //       onClick={() => console.log("edit func", row.original.id)} // Pass the payment ID to the delete function
  //     >
  //       Edit
  //     </button>
  //   ),
  // },
  // {
  //   id: "delete",
  //   enableHiding: false,
  //   cell: ({ row }) => (
  //     <button
  //       className="text-red-500 cursor-pointer"
  //       onClick={() => console.log("delete func", row.original.id)} // Pass the payment ID to the delete function
  //     >
  //       Delete
  //     </button>
  //   ),
  // },
];

import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "@/store/userSlice";
import { clearName, updateName } from "@/store/nameSlice";

import Modal from "@/components/ModalDelete";
import { updateModal } from "@/store/modalSlice";
import ModalDelete from "@/components/ModalDelete";
import ModalEdit from "@/components/ModalEdit";
import { updateModalEdit } from "@/store/editSlice";
import {
  deleteUser,
  fetchUsers,
  startEditUser,
  cancelEditUser,
  submitEditUser,
  User,
} from "@/store/userSlice";
import { getUserId } from "@/store/userIdSlice";

export default function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [data, setData] = useState<any>();

  const dispatch = useDispatch<any>();
  // const user = useSelector((state: any) => state.user.users);
  const name = useSelector((store: any) => store.name.value);
  const modalBtn = useSelector((state: any) => state.modal);
  const modalEdit = useSelector((state: any) => state.edit);

  const data: any = useSelector((state: any) => state.user.users);
  const status: string = useSelector((state: any) => state.user.status);
  const error: string | null = useSelector((state: any) => state.user.error);
  const editingUserId: number | null = useSelector(
    (state: any) => state.user.editingUserId
  );

  // useEffect(() => {
  //   const FetchUsers = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         // console.log("dataRes:", dataRes);
  //         setData(data);
  //         // dispatch(setDataUser(dataRes));
  //         // console.log("user:", data);
  //         // dispatch(fetchUsers());
  //       } else {
  //         console.error("failed fetch users:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching users:", error);
  //     }
  //   };
  //   FetchUsers();
  // }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      {data ? (
        <div className="w-full p-2">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter emails..."
              value={
                (table.getColumn("email")?.getFilterValue() as string) ?? ""
              }
              onChange={(event: any) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {modalBtn && <ModalDelete />}
      {/* <button onClick={() => dispatch(updateModal({}))}>modal delete</button> */}
      {modalEdit && <ModalEdit />}
      {/* <button onClick={() => dispatch(updateModalEdit({}))}>modal edit</button> */}
      <div>
        {/* <h2>List of Users</h2>
        {user.loading && <div> loading...</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user && user.users.length ? (
          <ul>
            {user.users.map((x: any) => (
              <li key={x.id}>{x.name}</li>
            ))}
          </ul>
        ) : null} */}

        {/* <h2>
          my name is {name} {user}
        </h2>
        <button
          onClick={() => {
            dispatch(updateName("lasha"));
          }}
        >
          change name
        </button>
        <button
          className="ml-5"
          onClick={() => {
            dispatch(clearName());
          }}
        >
          delete name
        </button> */}
      </div>
    </>
  );
}
