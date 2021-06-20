import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../validation/is-empty";

const ProfileItem = ({ profile }) => {
  return (
    <div>
      <img src={profile.user.avatar} alt="avatar"></img>
      <h3>User : {profile.user.name}</h3>
      <Link to={`/profile/${profile.handle}`}>
        <h4>view profile</h4>
      </Link>
      <div>{profile.age}</div>
      <div>{profile.employment}</div>
      <p>{profile.bio}</p>
      <div>{profile.rel_status}</div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
