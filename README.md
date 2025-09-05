# simple-sso-server
acts like dummy sso server  or OID provider


# usage

<code>
async login() {
  const redirectUri = encodeURIComponent('http://localhost:4200/auth-callback');
  window.location.href = `http://localhost:5000/sso/login?redirect_uri=${redirectUri}`;
}
</code>
