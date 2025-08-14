import crypro from 'crypto'
export const FACEBOOK_AUTH_URL = `https://www.facebook.com/v21.0/dialog/oauth?` +
  `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=http://localhost:3001/api/auth/instagram/callback` +
  `&scope=email,public_profile` +
  `&response_type=code`;
 
