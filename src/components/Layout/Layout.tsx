// components/layout.js

import React from "react";
import Navbar from "../common/Navbar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="h-screen">{children}</main>
      {/* {children} */}
    </>
  );
}
