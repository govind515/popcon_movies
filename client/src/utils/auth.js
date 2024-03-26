import decode from "jwt-decode";

class AuthService {
  // Get user profile from decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user is logged in by verifying if token exists and is not expired
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`, otherwise return `false`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if token is expired
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      // If token is expired, remove it from localStorage
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Save token to localStorage and redirect to homepage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove token from localStorage and reload page
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

// Create instance of AuthService
const authService = new AuthService();
export default authService;
