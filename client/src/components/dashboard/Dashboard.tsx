import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const history = useHistory();

  const handleEdit = () => {
    history.push("/edit-profile");
  };

  const handleDelete = (e) => {
    deleteAccount();
  };

  let dashboardContent;

  if (profile == null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length !== 0) {
      dashboardContent = (
        <div>
          <p>
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <button onClick={handleEdit}>edit profile</button>
          <button onClick={handleDelete}>delete account</button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p>Welcome {user.name}</p>
          <p>You haven't set a profile yet.</p>
          <Link to="/create-profile">
            <button>create profile</button>
          </Link>
        </div>
      );
    }
  }

  return <div>{dashboardContent}</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
