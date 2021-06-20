import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

const PostForm = () => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <div>
      <h4>post feed</h4>
    </div>
  );
};

export default PostForm;
