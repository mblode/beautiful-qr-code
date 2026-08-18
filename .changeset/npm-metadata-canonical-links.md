---
"beautiful-qr-code": patch
"@beautiful-qr-code/cli": patch
"@beautiful-qr-code/react": patch
---

Point the npm author and homepage at blode.co

The published packages carried `https://mblode.com` as the author URL and
`m@mblode.com` as the author email. That domain does not resolve, so every
package page on npm has been crediting a dead origin, and the contact address
bounced.

`homepage` now points at https://blode.co/beautiful-qr-code, the page that
actually documents the project, rather than the GitHub readme.

The web app already had this right, with a comment explaining that the identity
edge has to point at the site publishing `https://blode.co/#person` or it
credits an unrelated origin. The package metadata was simply missed.
