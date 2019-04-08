import axios from 'axios'

export const GET_USER = 'GET_USER'

export function getUser() {
    
return async function(dispatch) {
    await axios
      .get("/getUser", {
        headers: {
          Authorization: localStorage.getItem("inspectacyjwt")
        }
      })
      .then(obj => {
        return dispatch({
          type: "GET_USER",
          data: obj.data.user
        });
      })
  };
}



