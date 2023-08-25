import { Rating } from "@material-ui/lab";
import React from "react";
import { useMeQuery } from "../../redux/auth";
import { Avatar } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
const ReviewCard = ({ review,getReview }) => {
    const { data: userData } = useMeQuery();
    const { id } = useParams(); // Renamed 'data' to 'userData'
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
 const deleteReview = async () => {
   try {
       if (window.confirm("Are you sure delete review?")) {
         const { data } = await axios.delete(
           `${process.env.REACT_APP_SERVER_URL}/api/v1/review-delete/${id}/${review?._id}`,
           {
             withCredentials: true, // Include credentials
           }
         );
         if (data.success) {
           toast.success("Review Deleted succes");
           //    getReview()
         } // Replace with your API endpoint
       }
   } catch (error) {
     console.error("Error Deleting review:", error);
     toast.error("Error Deleting review");
   }
 };
  const canDeleteReview =
    userData?.user?.role === "admin" ||
    userData?.user?.role === "sub_admin" ||
    review?.user?._id === userData?.user?._id;

  return (
    <div className="reviewCard">
      <Avatar src={review?.user?.avatar?.url} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
      {canDeleteReview && <span onClick={deleteReview} className="text-red-500 cursor-pointer"><DeleteIcon/></span>}
    </div>
  );
};

export default ReviewCard;
