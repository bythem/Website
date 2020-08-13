import {
  fetchUserDetailsError,
  fetchUserDetailsPending,
  fetchUserDetailsSuccess,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchUserDetails(user) {
  return (dispath) => {
    dispath(fetchUserDetailsPending());
    console.log(user);
    let dref = db.ref("/userdetails/" + user.uid);
    dref.once("value", (snapshot) => {
      if (snapshot.val()) {
        console.log("user exists");
      } else {
        console.log("create user");
      }
      dispath(fetchUserDetailsSuccess(["username", "uday"]));
    });
  };
}

export default fetchUserDetails;
