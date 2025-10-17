import { useAuth0 } from "@auth0/auth0-react";
const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <button onClick={handleLogout} className='bg-green-400 text-black rounded-3xl hover: cursor-pointer px-3 py-3 font-bold flex items-center'>
      Log Out
    </button>
  );
};

export default LogoutButton;