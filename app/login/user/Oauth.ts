import crypro from 'crypto'
export const FACEBOOK_AUTH_URL = `https://www.facebook.com/v21.0/dialog/oauth?` +
  `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent("https://esadev.com.br/api/auth/linkedin/callback")}` +
  `&scope=email,public_profile` +
  `&response_type=code`;
 