import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Divider,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LogInButton } from "../styledComps/styledComps";
import { reviewProduct } from "../../redux/actions/productsActions";

const useStyles = makeStyles((theme) => ({
  parentBox: {
    border: "1px solid lightgray",
    backgroundColor: "white",
    padding: "30px",
    width: "100%",
  },
}));
const ReviewSection = ({ product, user }) => {
  const initialReviewValue = {
    rating: "",
    review: "",
  };
  const classes = useStyles();
  const [reviewValue, setReviewValue] = useState(initialReviewValue);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewValue({ ...reviewValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      ...reviewValue,
      rating: Number(reviewValue.rating),
      name: user.verifiedUser.name,
    };
    dispatch(reviewProduct(product.id, review));
    setReviewValue(initialReviewValue);
  };

  return (
    <Box className={classes.parentBox}>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      <Divider />
      {product?.reviews?.map((review, index) => (
        <Box key={index}>
          <Typography variant="h6">{review?.name}</Typography>
          {review && <Rating value={review?.rating} readOnly />}
          <Typography variant="body1" align="justify" gutterBottom>
            {review?.review}
          </Typography>
        </Box>
      ))}
      <Divider />
      {user ? (
        <Box>
          <Stack spacing={2}>
            <Typography variant="h5" my={2}>
              Rate Product
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl>
                <InputLabel>Rating</InputLabel>
                <Select
                  label="Rating"
                  name="rating"
                  onChange={handleChange}
                  value={reviewValue.rating}
                >
                  <MenuItem value={1}>Poor</MenuItem>
                  <MenuItem value={2}>Fair</MenuItem>
                  <MenuItem value={3}>Good</MenuItem>
                  <MenuItem value={4}>Very Good</MenuItem>
                  <MenuItem value={5}>Excellent</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Review"
                name="review"
                variant="outlined"
                rows={4}
                multiline
                value={reviewValue.review}
                onChange={handleChange}
              />
              <LogInButton type="submit">Submit</LogInButton>
            </Stack>
          </form>
        </Box>
      ) : (
        <Box>
          <Divider />
          <Typography variant="h5" align="justify" mt={2}>
            Login In To Rate Product
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReviewSection;
