// Direction B selected prototype — isolated, accessible, network-free.
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = name => readFileSync(new URL(name, import.meta.url), "utf8");
const sizeOf = name => statSync(new URL(name, import.meta.url)).size;

const home = "index.html";
const favicon = "favicon.svg";
const test = "check-prototypes.mjs";
const readme = "README.md";

for (const file of [home, favicon, test, readme]) {
  if (sizeOf(file) <= 1) throw new Error(`${file} is unexpectedly empty`);
}

const html = read(home).toLowerCase();

const expect = (label, assertion, text) => {
  if (!assertion) throw new Error(label + (text ? ` (${text})` : ""));
};

expect("prototype has language", html.includes('lang="en-gb"'));
expect("prototype has viewport", html.includes('name="viewport"'));
expect("prototype is noindex", html.includes('name="robots" content="noindex,nofollow"'));
expect("prototype has skip link", html.includes("skip to main content"));
expect("prototype has main", html.includes("<main"));
expect("prototype has headline", /<h1[\s\S]+<\/h1>/.test(html));
expect("prototype has nav CTA", html.includes("class=\"cta\"") && html.includes("#next"));
expect("prototype has focus states", html.includes(":focus-visible"));
expect("prototype supports reduced motion", html.includes("prefers-reduced-motion:reduce"));
expect("prototype is lightweight", sizeOf(home) < 20_000, `${sizeOf(home)} bytes`);
expect("prototype does not claim live AI", !/(ai generation is live|managed hosting included|subscription required|pay now|publish your site for free)/.test(html));
expect("prototype avoids fetch", !html.includes("fetch("));
expect("prototype avoids XHR", !html.includes("xmlhttprequest"));
expect("prototype avoids iframes", !html.includes("<iframe"));
expect("prototype avoids sendBeacon", !html.includes("navigator.sendbeacon"));

const readmeText = read(readme).toLowerCase();
expect("README records boundaries", readmeText.includes("not live") && readmeText.includes("not published") && readmeText.includes("ai generation"));
expect("README records live baseline", readmeText.includes("tested hostinger static preview"));
expect("README records branch distinction", readmeText.includes("earlier simplified preview"));

console.log("12 checks passed.");