import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useStore from "../store";
import Spinner from "./Spinner";
import { logoutUserFn } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";

const Header = () => {
  const store = useStore();
  const user = store.authUser;

  const { mutate: logoutUser } = useMutation(() => logoutUserFn(), {
    onMutate(variables) {
      store.setRequestLoading(true);
    },
    onSuccess(data) {
      store.setRequestLoading(false);
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      document.location.href = "/login";
    },
    onError(error: any) {
      store.setRequestLoading(false);
      store.setAuthUser(null);
      document.location.href = "/login";
    },
  });

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link to="/" className="text-ct-dark-600 text-2xl font-semibold">
              CodevoWeb
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/" className="text-ct-dark-600">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/register" className="text-ct-dark-600">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
