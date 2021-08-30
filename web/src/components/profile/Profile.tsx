import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

const Profile = ({ getProfileByHandle, profile: { profile, loading } }) => {
  const { handle } = useParams();

  useEffect(() => {
    if (handle) {
      getProfileByHandle(handle);
    }
  }, [getProfileByHandle, handle]);

  let profileContent;

  if (!profile || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div>
          <Link to="/profiles">
            <button>back to profiles</button>
          </Link>
        </div>
        <div>
          <div>
            <img src={profile.user.avatar} alt="avatar"></img>
            <h3>User : {profile.user.name}</h3>
            <div>{profile.age}</div>
            <div>{profile.employment}</div>
            <p>{profile.bio}</p>
            <div>{profile.rel_status}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{profileContent}</div>;
};

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
