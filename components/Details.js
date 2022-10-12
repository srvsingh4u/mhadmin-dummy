import React from "react";
import Userpage from "./Userpage";
import { useRouter } from "next/router";
import Test from "./test";

export default function Details() {
  const router = useRouter();
  // console.log(router);
  // console.log(router.asPath);
  return (
    <div>
      <Userpage />
    </div>
  );
}
