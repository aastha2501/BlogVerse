import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
//filebase to upload image
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../redux/features/blogSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};
// the component for add blog and update blog
export default function AddEditBlog() {
  const [blogData, setBlogData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { title, description, tags } = blogData;
  const {error, loading, userBlogs} = useSelector((state) => ({...state.blog}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      const singleBlog = userBlogs.find((blog) => blog._id === id);
      console.log(singleBlog);
      setBlogData({...singleBlog});
    }
  }, [id]);

  useEffect(()=>{
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!tags.length) {
      setTagErrMsg("Please provide some tags");
    }

    if(title && description && tags){
        const updatedBlogData = {...blogData, name: user?.user?.name};
        if(!id) { //means add blog if not id is there
          dispatch(createBlog({updatedBlogData, navigate, toast}));
        } else {
          dispatch(updateBlog({id, updatedBlogData, toast, navigate}));
        }
       
        handleClear();
    }
  }
  const onInputChange = (e) => {
    const {name, value} = e.target;
    setBlogData({...blogData, [name]: value});
  }
  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setBlogData({...blogData, tags: [...blogData.tags, tag]});
  }
  const handleDeleteTag = (deleteTag) => {
    setBlogData({...blogData, tags: blogData.tags.filter((tag) => tag!==deleteTag)})
  }
  const handleClear = () => {
    setBlogData({title:"", description:"", tags: []});
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center" style={{backgroundColor: "#F2CBF2"}}>
        <h4 style={{color: "#7F167F", marginTop: "12px"}}>{id ? "Update Blog" : "Add Blog"}</h4>
        <MDBCardBody>
        <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
          <div className="col-md-12">
            <MDBInput
              label="Enter Title"
              type="text"
              value={title}
              name="title"
              onChange={onInputChange}
              className="form-control"
              required
              invalid
              validation="Please provide title"
            />
          </div>
          <div className="col-md-12">
            <MDBInput
              label="Enter Description"
              type="text"
              // style={{ height: "100px" }}
              value={description}
              name="description"
              onChange={onInputChange}
              className="form-control"
              required
              invalid
              textarea
              rows={4}
              validation="Please provide description"
            />
          </div>
          <div className="col-md-12">
            <ChipInput
              name="tags"
              variant="outlined"
              placeholder="Enter Tag"
              fullWidth
              value={tags}
              onAdd={(tag) => handleAddTag(tag)}
              onDelete={(tag) => handleDeleteTag(tag)}
            />
            {tagErrMsg && 
              <div className="tagErrMsg">{tagErrMsg}</div>
            }
          </div>
          <div className="d-flex justify-content-start">
            {/* convert image file into base 64 */}
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setBlogData({ ...blogData, imageFile: base64 })
              }
            />
          </div>
          <div className="col-12">
            <MDBBtn style={{width: "100%", backgroundColor: "#7F167F"}}>{id ? "Update" : "Submit"}</MDBBtn>
            <MDBBtn style={{width: "100%"}} className="mt-2" color="danger" onClick={handleClear}>Clear</MDBBtn>

          </div>
        </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
