import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadProfiles } from "../redux/actions/profile";

const ClientSelector = ({ loadProfiles, profiles }) => {
  useEffect(() => {
    loadProfiles();
  }, []);
  
  const handleChange=e=>{}
  return (
    <div className="form-group">
      <label>Nombre del cliente</label>
      <input className="form-control" type="text" />
      <div>
        {profiles !== null && profiles.length > 0 && (
          <div className="mt-2 ">
            {profiles.map((profile) => (
              <div className=" pt-0 pb-0 list-group-item" key={profile._id}>
                <div className="form-group">
                  <label className="text-dark h6 pt-2 pb-0 mb-0">
                    {profile.name}
                    <input
                      className="d-one m-0"
                      type="radio"
                      value="profile._id"
                      
                      
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loanLoanding: state.profile.loading,
});
export default connect(mapStateToProps, { loadProfiles })(ClientSelector);
