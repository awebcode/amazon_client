import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./review.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useMeQuery } from "../../redux/auth";

const Review = ({ open, setOpen, product }) => {
  const { data: userData } = useMeQuery();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    const userReview = product?.reviews?.find(
      (review) => review?.user === userData?.user?._id
    );
    if (userReview) {
      setExistingReview(userReview);
      setRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setExistingReview(null);
      setRating(0);
      setComment("");
    }
  }, [product?.reviews, userData?.user?._id]);

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
        withCredentials: true,
      })
      .then((response) => {
        console.log("Review submitted successfully!", response.data);
        toast.success("Review submitted successfully!");
        setOpen(false);
        
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        toast.error("Error submitting review");
      });
  };

  return (
    <>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {/* {console.log("exisreview", product?.reviews)} */}
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e, newValue) => setRating(newValue)}
            value={rating}
            size="large"
            precision={0.5}
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
};

export default Review;
