import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

const Posts = () => {
  return (
    <div>
      <PostForm />
    </div>
  );
};

export default Posts;
