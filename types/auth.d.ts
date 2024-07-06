type AuthUser = {
  user_id: string;
  username: string;
  email: string;
  user_image_url: string;
  access_token: string;
  refresh_token: string;
  token_expiry: number | null;
  email_verified: boolean | null;
  role: string;
};
