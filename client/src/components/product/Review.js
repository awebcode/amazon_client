import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./review.css"
import axios from "axios"
import { toast } from 'react-toastify';
const Review = ({ open, setOpen,product }) => {
   
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", product._id);

      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/v1/review`, myForm, {
          withCredentials: true, // Include credentials
        }) // Replace with your API endpoint
        .then((response) => {
          console.log("Review submitted successfully!", response.data);
          toast.success("Review submitted successfully!");
          setOpen(false);
          // You can also update the state or perform other actions based on the response
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
          toast.error("Error submitting review");
          // Handle the error as needed
        });
    };
  return (
    <>
      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Review