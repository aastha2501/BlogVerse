import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux/features/blogSlice";
import CardBlog from "../components/CardBlog";
import Spinner from "../components/Spinner";

export default function Home() {
  const { blogs, loading } = useSelector((state) => ({ ...state.blog }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        // marginTop: "5px"
      }}
    >
      <MDBRow style={{marginTop: "5rem"}}>
        {blogs.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No blogs found...
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-3">
              {blogs && blogs.map((item, index)=>
                <CardBlog key={index} {...item}/>
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
