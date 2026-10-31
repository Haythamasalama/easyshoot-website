// Tells Bing, Yandex and other IndexNow engines which pages exist, right after a deploy.
import { readFileSync, readdirSync } from "node:fs";

const host = "easyshoot.haythamasalama.me";
const key = readdirSync("public").find(f => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(".txt", "");
if (!key) throw new Error("No IndexNow key file in public/");
const urlList = [...readFileSync("dist/sitemap-0.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
