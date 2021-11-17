import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ text }) => {
  return (
    <div className="loading">
      <div>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
      </div>

      <p>{text}</p>
      <div>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
