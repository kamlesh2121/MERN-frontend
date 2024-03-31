import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children,title,description,keywords,author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} /> 
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author}/>

      </Helmet>
      <Header />

      <main style={{paddingBottom:'100px'}}>{children}</main>
      <Toaster />

      <Footer />
    </>
  );
};

Layout.Defaulttprops = {
  title:"Ecommerce-App",
  description:"Mern stack Proejct",
  keywords:"React,Nodejs,Mongodb",
  author:"KAMLESH BHATI",
}

export default Layout;
