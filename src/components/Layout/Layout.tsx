// components/layout.js

import Navbar from '../common/Navbar'

type LayoutProps = {
  children: React.ReactNode | React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      {/* <main className="fit">{children}</main> */}
      {children}
    </>
  )
}