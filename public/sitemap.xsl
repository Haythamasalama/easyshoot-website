<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap · EasyShoot</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <style>
          :root { color-scheme: light dark; --bg: #FFFFFF; --panel: #F5F5F7; --line: rgba(0,0,0,.08); --text: #1D1D1F; --muted: #6E6E73; --accent: #0E95EE; }
          @media (prefers-color-scheme: dark) { :root { --bg: #0A0A0B; --panel: #161618; --line: rgba(255,255,255,.08); --text: #F5F5F7; --muted: #98989D; --accent: #4FA6FF; } }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif; -webkit-font-smoothing: antialiased; }
          main { max-width: 1040px; margin: 0 auto; padding: 48px 16px 64px; }
          header { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
          header img { width: 44px; height: 44px; }
          h1 { font-size: 28px; font-weight: 700; letter-spacing: -.02em; margin: 0; }
          p.lead { color: var(--muted); margin: 0 0 28px; }
          a { color: var(--accent); text-decoration: none; }
          a:hover { text-decoration: underline; }
          .count { display: inline-block; background: var(--panel); border: 1px solid var(--line); border-radius: 999px; padding: 2px 10px; font-size: 12px; color: var(--muted); margin-left: 6px; }
          .table { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
          .row { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 16px; align-items: center; padding: 10px 16px; border-top: 1px solid var(--line); }
          .row:first-child { border-top: 0; }
          .row.head { background: var(--panel); color: var(--muted); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
          .url { overflow-wrap: anywhere; }
          .langs { display: flex; gap: 4px; flex-wrap: wrap; }
          .langs a { font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 1px 6px; border-radius: 6px; background: var(--panel); border: 1px solid var(--line); }
          .date { color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
          @media (max-width: 640px) { .row { grid-template-columns: 1fr; gap: 4px; } .row.head { display: none; } }
        </style>
      </head>
      <body>
        <main>
          <header>
            <img src="/icon.png" alt=""/>
            <h1>EasyShoot Sitemap</h1>
          </header>
          <xsl:apply-templates/>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="s:sitemapindex">
    <p class="lead">An index of the sitemaps search engines read for <a href="/">easyshoot.haythamasalama.me</a>.<span class="count"><xsl:value-of select="count(s:sitemap)"/> sitemaps</span></p>
    <div class="table">
      <div class="row head"><span>Sitemap</span><span></span><span>Last modified</span></div>
      <xsl:for-each select="s:sitemap">
        <div class="row">
          <a class="url" href="{s:loc}"><xsl:value-of select="s:loc"/></a>
          <span></span>
          <span class="date"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></span>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>

  <xsl:template match="s:urlset">
    <p class="lead">Every page of <a href="/">easyshoot.haythamasalama.me</a> in English, Arabic, French, Spanish and German.<span class="count"><xsl:value-of select="count(s:url)"/> pages</span></p>
    <div class="table">
      <div class="row head"><span>Page</span><span>Languages</span><span>Last modified</span></div>
      <xsl:for-each select="s:url">
        <div class="row">
          <a class="url" href="{s:loc}"><xsl:value-of select="s:loc"/></a>
          <span class="langs">
            <xsl:for-each select="xhtml:link[@hreflang != 'x-default']">
              <a href="{@href}" hreflang="{@hreflang}"><xsl:value-of select="@hreflang"/></a>
            </xsl:for-each>
          </span>
          <span class="date"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></span>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>
</xsl:stylesheet>
