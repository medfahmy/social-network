import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../components/common/Spinner";
import { getProfiles } from "../actions/profileActions";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  let profileItems;

  if (!profiles || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles found</h4>;
    }
  }

  return (
    <div>
      <h1>Profiles</h1>
      {profileItems}
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
