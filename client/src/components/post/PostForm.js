import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPost } from "../../actions/postActions";

const PostForm = ({ addPost, auth: { user } }) => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const post = {};

  useEffect(() => {
    if (errors) setErrors(errors);
  }, [errors]);

  const onChange = (e) => {
    setText(e.target.value);
    // console.log(text);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      text: text,
      name: user.name,
      avatar: user.avatar,
    };

    addPost(newPost);
    setText("");
  };

  return (
    <div>
      <div>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        <p>{text}</p>
      </div>
      <div>
        <h4 className="large text-primary">{post ? "edit" : "create"} post</h4>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <textarea
              placeholder="Age"
              name="age"
              value={text}
              onChange={onChange}
            />
          </div>

          <button type="submit">submit</button>

          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
