import crypto from "crypto";

export default function LinkedInLogin() {
  const handleLogin = () => {
    const state = window.crypto.randomUUID(); // API do navegador
    localStorage.setItem("linkedin_oauth_state", state);

    const authUrl =
      "https://www.linkedin.com/oauth/v2/authorization?" +
      "response_type=code" +
      `&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent("http://localhost:3001/api/auth/linkedin/callback/")}` +
      "&scope=r_liteprofile%20r_emailaddress" +
      `&state=${state}` +
      "&prompt=consent";

    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login com LinkedIn</button>;
}

