import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configs from "./config/config";

export default function User() {
  const navigate = useNavigate();
  const serverURL = configs.REACT_APP_SERVER_URL;

  const [session, setSession] = useState({});

  useEffect(() => {
    axios(`${serverURL}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        const { iat, ...authData } = data; // remove unimportant iat value

        setSession(authData);
      })
      .catch((err) => {
        navigate("/signin");
      });
  }, []);

  async function signOut() {
    await axios(`${serverURL}/logout`, {
      withCredentials: true,
    });

    navigate("/signin");
  }

  return (
    <div>
      <h3>User session:</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
