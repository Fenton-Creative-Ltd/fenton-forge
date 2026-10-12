// Local verification for Fenton Forge Direction C Living Showcase prototype.
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const read = name => readFileSync(root + name, "utf8");
const sizeOf = name => statSync(root + name).size;
const html = read("index.html");
const readme = read("README.md").toLowerCase();
const size = sizeOf("index.html");
const expect = (label, assertion, detail) => {
  if (!assertion) throw new Error(label + (detail ? ` (${detail})` : ""));
};

expect("index.html is not empty", size > 500);
expect("index.html is lightweight", size < 20_000, `${size} bytes`);
expect("index.html is noindex", html.includes('name="robots" content="noindex,nofollow"'));
expect("index.html has viewport", /<meta name="viewport"[^>]*width=device-width/i.test(html));
expect("index.html is accessible", html.includes('lang="en-GB"') && html.includes("<main"));
expect("index.html has skip link", html.includes('class="skip"') && html.includes('href="#main"'));
expect("index.html has headline", /<h1[\s\S]+<\/h1>/.test(html));
expect("index.html has style switcher", html.includes('data-style="atmosphere"') && html.includes('data-style="studio"') && html.includes('data-style="canvas"'));
expect("index.html has accessible switch state", html.includes('aria-pressed="true"') && html.includes('aria-pressed="false"'));
expect("index.html has live status", html.includes('aria-live="polite"') && html.includes('id="style-status"'));
expect("index.html has focus states", html.includes(":focus-visible"));
expect("index.html preserves reduced motion", html.includes("prefers-reduced-motion:reduce"));
expect("index.html has builder CTA", /<a[^>]+href="[^"]*builder[^"]*"[^>]*>/i.test(html));
expect("index.html avoids external requests", !/(https?:\/\/|@import|fetch\(|xmlhttprequest|navigator\.sendbeacon|<iframe)/i.test(html));
expect("index.html does not claim live AI", !/(ai generation is live|managed hosting included|subscription required|pay now|publish your site for free)/i.test(html));
expect("index.html states honest non-live status", html.toLowerCase().includes("not live") || html.toLowerCase().includes("isolated review"));
expect("index.html keeps local only", html.toLowerCase().includes("no data") && html.toLowerCase().includes("local"));
expect("README records live baseline", readme.includes("tested hostinger static baseline"));
expect("README records no deployment", readme.includes("nothing here is deployed"));
expect("README records quick test", readme.includes("quick customer test"));
expect("README records commercial path", readme.includes("managed ai creation") || readme.includes("subscription billing"));
expect("README records comparison", readme.includes("direction b") && readme.includes("hostinger"));

console.log("Direction C checks passed.");