import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchBlogs } from "../redux/features/blogSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

export default function Header() {
  //for responsive header to decrease the size this state is for
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState();

  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = user?.token;

  if(token) {
    const decodedToken = decode(token);
    if(decodedToken.exp*1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  }
 
  // console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(search) {
      dispatch(searchBlogs(search));
      navigate(`/blogs/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  } 

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#7F167F" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ fontWeight: "600", fontSize: "30px", color: "white" }}
          className="brandName"
        >
          BlogVerse
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <MDBIcon icon="bars" fas style={{color: "white"}}/>
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0 navbarItem">
           
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {!!user?.user?._id && (
              <React.Fragment>
                 <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addBlog">
                    <p className="header-text">Add Blog</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
               
              </React.Fragment>
            )}
            {!!user?.user?._id ? (
              <MDBNavbarItem style={{marginRight: "30px"}}>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>Logout</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}

             {/* adding logged in user name to the header */}
             {user?.user?._id && (
              <h5 style={{marginRight: "30px", marginTop: "31px", color: "#F3CCFF", fontSize:"14px"}}><MDBIcon far icon="user" style={{fontSize: "18px"}}/> &nbsp;{user?.user?.name}</h5>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
            type="text"
            // className="form-control"
            className=" searchBar"
            placeholder="Search Tour"
            value={search}
            style={{border:"none", outline:"none"}}
            onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{marginTop: "5px", marginLeft: "5px", color:"white", cursor: "pointer"}}>
              <MDBIcon fas icon="search" onClick={handleSubmit}/>
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
