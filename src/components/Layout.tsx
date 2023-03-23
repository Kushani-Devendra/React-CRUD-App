import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Organizations from "./organizations/Organizations";
import Overview from "./overview/Overview";

import Users from "./users/Users";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;
