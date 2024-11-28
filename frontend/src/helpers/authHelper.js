import { unSetUser } from "../redux/slice/userSlice";
import { signOut } from "../services/apiServices";

export async function handleLogout(dispatch) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(unSetUser());
  await signOut();
}

export function clearToken(dispatch) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(unSetUser());
}
