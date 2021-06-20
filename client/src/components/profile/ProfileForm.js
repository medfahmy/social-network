import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

const initialState = {
  handle: "",
  age: "",
  employment: "",
  bio: "",
  rel_status: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors) setErrors(errors);
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [errors, loading, getCurrentProfile, profile]);

  const { bio, age, employment, handle, rel_status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history /*profile ? true : false*/);
  };

  return (
    <div>
      <h1 className="large text-primary">
        {profile ? "Edit" : "Create"} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="rel_status" value={rel_status} onChange={onChange}>
            <option value="Single">Single</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Employment"
            name="employment"
            value={employment}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Handle"
            name="handle"
            value={handle}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  erros: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
