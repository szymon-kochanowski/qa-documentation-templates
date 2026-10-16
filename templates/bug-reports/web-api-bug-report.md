# [WEB / REST API] Standardized Defect & Incident Report Template
**Author:** Szymon Kochanowski  
**Standard:** RFC 9110 HTTP Semantics, OpenAPI 3.1 & Production Web QA Best Practices  
**File Reference:** `templates/bug-reports/web-api-bug-report.md`

---

## 1. Defect Header & Classification
* **Issue Title:** `[<MICROSERVICE/MODULE>][<HTTP METHOD>][<STATUS CODE>] Brief summary of the defect`  
  * *Example:* `[AUTH-SERVICE][POST /v1/tokens/refresh][500] Refresh token endpoint returns unhandled 500 Internal Server Error when client clock drifts by >= 30 seconds`
* **Issue Key / ID:** `API-XXXX`
* **Reporter:** Szymon Kochanowski (QA Engineer / SDET)
* **Date Reported:** YYYY-MM-DD
* **Environment:** `Staging-EU` / `UAT` / `Production-Canary` / `Local Docker Compose`
* **Severity:** **Critical** *(Blocker / Critical / Major / Minor / Trivial)*
* **Priority:** **P1 - Urgent** *(P1 / P2 / P3 / P4)*
* **Release / Tag:** `v2.4.1-staging.3`

---

## 2. API Endpoint & Infrastructure Target
| Parameter | Value |
| :--- | :--- |
| **Target URL** | `https://api.staging.example.com/v1/tokens/refresh` |
| **HTTP Method** | `POST` |
| **Expected Status Code** | `200 OK` (or `401 Unauthorized` with structured JSON if expired) |
| **Actual Status Code** | `500 Internal Server Error` |
| **Microservice / Component** | `identity-provider-service` (Pod: `idp-core-7df6c99c95-h29w8`) |
| **Database / Cache State** | Redis Cluster v7.2.4 (Session store), Postgres 16 (Users) |
| **Client / User Agent** | Chrome 129.0.6668.71 (macOS 15.0), Postman v11.14.0, cURL 8.7.1 |

---

## 3. Preconditions
1. User account `qa_automator@example.com` exists in the staging database.
2. User is authenticated and holds a valid Refresh Token in the `refresh_token` HTTP-Only Secure Cookie or Bearer payload.
3. System time on client machine is offset by +35 seconds relative to NTP time (simulating mobile / local client clock drift).

---

## 4. Steps to Reproduce
1. Obtain an active Refresh Token via `POST /v1/auth/login`.
2. Wait 2 minutes for the short-lived Access Token (TTL = 120s) to expire.
3. Dispatch the token refresh request to `POST https://api.staging.example.com/v1/tokens/refresh` with client timestamp set slightly ahead.
4. Inspect the HTTP Response status line and payload body.

---

## 5. Reproduction Command (cURL)
```bash
curl -X POST "https://api.staging.example.com/v1/tokens/refresh" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "X-Correlation-ID: qa-test-7981b2-1016" \
  -H "User-Agent: QA-Automation-Suite/1.0.0" \
  -d '{
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMDE5MmUzODQiLCJleHAiOjE3Mjk0OTAwMDAsIm5iZiI6MTcyOTQ4OTk5MH0.dB9872c...",
    "deviceId": "dev_mac_arm64_00192a"
  }' \
  --compressed \
  --verbose
```

---

## 6. Expected vs. Actual Response

### Expected Response
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Correlation-ID: qa-test-7981b2-1016

{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1Ni...",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "refreshToken": "eyJhbGciOiJSUzI1Ni..."
  }
}
```

### Actual Response
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
X-Correlation-ID: qa-test-7981b2-1016

{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while verifying token claims.",
    "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
  }
}
```

---

## 7. Server Telemetry & Stack Trace (Log Excerpt)
```text
2026-10-16T10:18:04.112Z [ERROR] [idp-core] [correlationId=qa-test-7981b2-1016]: Unhandled Exception in TokenVerificationHandler
jsonwebtoken.NotBeforeError: jwt not active
    at /app/node_modules/jsonwebtoken/verify.js:142:19
    at /app/src/services/token.service.ts:88:24
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RefreshTokenController.handle (/app/src/controllers/auth.controller.ts:42:15)
Note: Clock tolerance leeway (clockTolerance) is missing in verify options, causing strict unhandled rejection instead of RFC 6749 401 invalid_grant.
```

---

## 8. Impact & Workaround
* **Business Impact:** Any mobile or desktop web user experiencing minor local clock skew is permanently logged out and blocked from re-authenticating, resulting in lost checkout sessions.
* **Suggested Fix:** Configure `clockTolerance: 60` (seconds) in JWT verification middleware and catch `NotBeforeError` to respond with HTTP `401 Unauthorized` rather than unhandled HTTP 500.
* **Temporary Workaround:** User must synchronize system clock via NTP and clear browser cookies to log in fresh.
