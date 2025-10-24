import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        color: "#dc2626",
        border: "1px solid #dc2626",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#dc2626";
        e.currentTarget.style.color = "white";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#dc2626";
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;