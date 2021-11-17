import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import backgroundImg from "../assets/images/home.jpg";

const PublicPage = () => {
  return (
    <div
      className="public"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div>
        <h1>Let's save your memory</h1>
        <Link to="/loggedin/gallery">
          <BsArrowRight />
          <span>Go to your gallery</span>
        </Link>
      </div>
    </div>
  );
};

export default PublicPage;
