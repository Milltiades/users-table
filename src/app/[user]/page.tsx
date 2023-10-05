"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const params = useParams();
  const userId =
    typeof params.user === "string" ? parseInt(params.user, 10) : 0;

  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId + 1}`
        );
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching product info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="p-20">
      {userInfo && (
        <div>
          <Link href={"/"}>
            <Image src="/back.svg" width={32} height={32} alt="back"></Image>
          </Link>
          <h1 className=" border-b-2 border-slate-900 p-5 text-2xl">
            User Details
          </h1>
          <div className=" p-5 ">
            <h1>Name: {userInfo.name}</h1>
            <h1>Email: {userInfo.email}</h1>
            <h1>City: {userInfo.address.city}</h1>
            <h1>Address: {userInfo.address.street}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
