"use client";

import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  //   let [loading, setLoading] = useState(true);
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <ClipLoader color="#0019ff" loading speedMultiplier={1} size={50} />
    </div>
  );
}
