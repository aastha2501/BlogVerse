import React, {useEffect} from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
//for date
import moment from "moment";
import { getBlog } from '../redux/features/blogSlice';

export default function SingleBlog() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {blog} = useSelector((state) => ({...state.blog}));
    const {id} = useParams();
    
    useEffect(() => {
        if(id) {
            dispatch(getBlog(id));
        }
    },[id]);

  return (
    <>
    <MDBContainer>
        <MDBCard className='mb-3' style={{marginTop: "6rem"}}>

            <MDBCardImage 
            position='top'
            style={{width:"100%", maxHeight:"560px"}}
            src={blog.imageFile}
            alt={blog.title}
            />
            <MDBCardBody>
            
                <MDBBtn tag="a" color='none' style={{float: "left", color: "#000"}} onClick={() => navigate("/")}>
                   {/* <MDBIcon
                   fas 
                   size="lg"
                   icon="long-arrow-alt-left"
                   style={{float: "left"}}
                   /> */}
                   <i class="fas fa-arrow-circle-left" style={{float: "left", fontSize: "25px", fontWeight: "600", color: "#7F167F"}}></i>
                </MDBBtn>
                <br/>
                <h4 style={{marginTop: "6px"}}>{blog.title}</h4>
                <span>
                    <p className='text-start blogName'>Created By: {blog.name}</p>
                </span>
                <div style={{float: "left", color: "grey"}}>
                    <span className='text-start'>{blog && blog.tags && blog.tags.map((item) => `#${item}`)}</span>
                </div>
                <br/>
                <MDBCardText className='text-start mt-2'>
                  
                    <MDBIcon  style={{float:"left", marginTop:"10px", marginRight: "5px"}} far icon="calendar-alt"   size="lg"/>
                    <small className='text-muted'>{moment(blog.createdAt).fromNow()}</small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {blog.description}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    </>
  )
}
