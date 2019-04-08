import axios from "axios";

//action type constant (makes debugging easier)

export const GET_INSPECTORS = "GET_INSPECTORS";
export const GET_PROFILE = "GET_PROFILE";


export function getInspectors() {
  return async function(dispatch) {
    await axios
      .get("/getAllInspectors", {
        headers: {
          Authorization: localStorage.getItem("inspectacyjwt")
        }
      })
      .then(obj => {
        return dispatch({
          type: "GET_INSPECTORS",
          data: obj.data,
        });
      })
      .then((obj) => {
        let url = window.location.href.split("/");
        let url_inspector_id = url.pop();
        // const { user } = this.props;
        axios.get(`/profile/${url_inspector_id}`, {})
        .then(response => {
          console.log(response.data.skills);
        //   this.setState({
        //     profile_data: response.data,
        //     profile_skills: response.data.skills
        //   });
        return dispatch({
            type: "GET_PROFILE",
            data: response.data.skills
          });
        });
      });
  };
}
