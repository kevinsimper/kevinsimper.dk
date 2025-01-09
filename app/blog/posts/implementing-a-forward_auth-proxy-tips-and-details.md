# Implementing a forward_auth proxy - tips and details

When I started building a server for handling `forward_auth` requests, it was like stepping into uncharted territory. Googling this concept usually leads you to comprehensive but heavyweight solutions like Authelia or middleware examples in Traefik and Caddy. These are great for robust setups but overkill when you just need a simple, functional proof of concept.

Forward authentication is a mechanism where a reverse proxy delegates user authentication to an external server. The flow looks like this:

1. A request reaches the reverse proxy (e.g., Traefik, Caddy).
2. The proxy forwards the request to an authentication server for validation.
3. The authentication server responds with either:
   - **HTTP 2xx**: User is authenticated, request proceeds to the backend.
   - Otherwise: User should be redirected to the login page. All headers are taken from the auth service and returned

This centralized authentication approach simplifies security across multiple apps behind a proxy.

[https://caddyserver.com/docs/caddyfile/directives/forward_auth](https://caddyserver.com/docs/caddyfile/directives/forward_auth)

---

### Implementation Insights and Tips

Here are the most critical insights I learned while implementing my forward authentication server. These are the steps and nuances that are not clearly documented in existing Caddy or Traefik guides but are essential for success:

1. **`forward_url` for internal services**

   Define the `forward_url` parameter explicitly in your Caddy or Traefik configuration. This parameter essentially tells your internal auth service what its public-facing address is. For example, if your authentication service is hosted internally at `http://auth.internal` but exposed to users as `https://auth.example.com`, you must set the `forward_url` to `https://auth.example.com`.

   ```caddy
   auth.example.com {
       reverse_proxy http://auth.internal {
           header_up Host {host}
       }
   }

   app.example.com {
       forward_auth http://auth.internal {
           uri /auth?forward_url=https://auth.example.com
       }
       reverse_proxy http://app.internal
   }
   ```

2. **Set Cookies on the Root Domain:**

   Ensure authentication cookies are set on the root domain (e.g., `.example.com`) and not just the subdomain serving the auth service. Without this, cookies won’t be forwarded properly by the proxy, breaking the authentication process for your services.

   ```python
   response.set_cookie(
       key="auth_token",
       value=encrypted_token,
       httponly=True,
       secure=True,
       samesite="None",
       domain=".example.com"
   )
   ```

3. **Leverage `X-Forwarded` Headers:**

   Use headers like `X-Forwarded-Host` and `X-Forwarded-Uri` to preserve user context. I added an `xforward` cookie to handle scenarios where users needed to return to their original destination seamlessly after logging in. This improved the user experience significantly.

   ```python
   host = request.headers.get("X-Forwarded-Host")
   uri = request.headers.get("X-Forwarded-Uri")
   response.set_cookie(
       key="xforward",
       value=f"{host}{uri}",
       httponly=True,
       secure=True,
       samesite="None",
       domain=".example.com"
   )
   ```

4. **Cookie Configuration Challenges:**

   Be mindful of cookie attributes like `httponly`, `secure`, and `samesite`. These are essential for security but can also cause headaches during testing, especially when dealing with domains or localhost setups. Test cookies thoroughly in both development and production environments.

   ```python
   response.set_cookie(
       key="auth_token",
       value=encrypted_token,
       httponly=True,
       secure=True if production else False,
       samesite="None" if production else "Lax",
       domain=".example.com" if production else None
   )
   ```

By focusing on these key areas, I was able to create a lightweight and functional forward authentication server using FastAPI. While tools like Authelia or Keycloak provide more comprehensive solutions, building your own server gives you control and a better understanding of the authentication flow.

---

![](https://static.swimlanes.io/b708fef4f75dc485aab75e8f1c6cbade.png)

```
# https://swimlanes.io/
title Forward Authentication Flow

actor User
participant Reverse Proxy as Proxy
participant Auth Service as Auth
participant Backend Service as Backend

User -> Proxy: Request dashboard.example.com
Proxy -> Auth: Is User Authenticated?
Note:
Checks session cookie which lives on .example.com

No cookie for now! So authencation denied.
Auth -> Proxy: Redirect to Login (HTTP 302)
Proxy -> User: Redirect to Login Page
Note:
Types in username and password
User -> Auth: Submit Login Credentials
Auth -> User: Set Auth Cookie and Redirect Back
Note:
User now has a session cookie set on .example.com
User -> Proxy: Retry Dashboard Request with Auth Cookie
Proxy -> Auth: Validate Auth Cookie
Note:
Session cookie is now read and accepted
Auth -> Proxy: User Validated (HTTP 200)
Proxy -> Backend: Forwards Request to Dashboard
Backend -> Proxy: Send Dashboard Content
Proxy -> User: Gets dashboard.example.com

```

