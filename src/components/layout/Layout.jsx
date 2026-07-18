import Header from "./header";
import NavBar from "./NavBar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main style={{ marginTop: "100px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
