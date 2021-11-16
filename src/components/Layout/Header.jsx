import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
// import { LinkContainer } from "react-router-bootstrap";
import { homeNavigation } from "../../data/navigation";
import { landingNavigation } from "../../data/navigation";
import { AuthContext } from "../../store/auth-context";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { isAuth, logout } = useContext(AuthContext);

  const navigation = isAuth ? homeNavigation : landingNavigation;
  const style = {
    color: "white",
    textDecoration: "none",
    paddingLeft: "1rem",
    fontSize: "1.2rem",
  };
  const acvive = {
    ...style,
    color: "#ccc",
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("signout");
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ fontSize: "1.5rem" }}>
            Your Photo Album
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {navigation.map((nav, index) => (
                // <Nav.Link>
                <NavLink
                  key={index}
                  style={({ isActive }) => (isActive ? acvive : style)}
                  to={nav.url}
                >
                  {nav.title}
                </NavLink>
                // </Nav.Link>
              ))}
            </Nav>
            {isAuth && (
              <Button
                style={{ margin: "0.3rem 0.8rem" }}
                variant="outline-light"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
