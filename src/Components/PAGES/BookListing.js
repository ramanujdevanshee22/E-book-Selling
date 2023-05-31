import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BookListing() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    if (!Auth) {
      navigate("/Login");
    }
  }, []);
  return (
    <div className="book-listing-heading">
      <span>Book Listing</span>
    </div>
  );
}

export default BookListing;
