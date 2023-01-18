// components/layout.js
import React from "react";
import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100%-105px)]">{children}</main>
      {/* {children} */}
    </>
  );
}
