# Static site security update

The production dependency audit reported **seven moderate advisories** against Next.js 16.4.3. Several concern shared server caches. Under the affected configurations, a visitor could receive content meant for another request or influence cached content later served to others.

This site builds with `output: "export"` and serves prebuilt files. Its production architecture limits exposure to advisories that require a running Next.js request handler or a shared server cache. The audit identified an affected package version. The review did not establish visitor data disclosure or cache poisoning on the deployed site.

This branch updates Next.js and its ESLint configuration to 16.4.5. The production dependency rescan returned zero advisories. The production build, TypeScript check, source lint, and all seven Chromium end-to-end tests passed locally. Rebuild and deploy the static image to ship the update.
