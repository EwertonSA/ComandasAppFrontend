import crypro from 'crypto'
const redirectUri = encodeURIComponent("https://esadev.com.br/api/auth/instagram/callback");

export const FACEBOOK_AUTH_URL = `https://www.facebook.com/v21.0/dialog/oauth?` +
  `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${redirectUri}` +
  `&scope=email,public_profile` +
  `&response_type=code`;