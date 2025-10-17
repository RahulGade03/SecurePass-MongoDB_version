import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
          prompt: "select_account"  // Forces Google to show the account selection popup
      }
  });
  };

  return <button onClick={handleLogin} className='bg-green-400 text-black rounded-3xl hover: cursor-pointer px-5 py-2 font-bold'>Log In</button>;
};

export default LoginButton;