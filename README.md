# kounted-site

The marketing site for [kounted.co](https://kounted.co). Plain static HTML and CSS with one small JavaScript file. There is no build step.

## Layout

```
site/
  index.html        the whole page: all copy lives here
  404.html          not found page
  assets/styles.css all styling, colors and type at the top in :root
  assets/main.js    header hairline and chart draw-in, nothing else
  assets/logo*.svg  logo lockup (dark and light) and mark
  assets/fonts/     Newsreader and JetBrains Mono, self-hosted
  favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png
  robots.txt, sitemap.xml, CNAME
.github/workflows/pages.yml   deploys site/ on every push to main
```

## Edit copy

1. Open `site/index.html`. Each section starts with a comment such as `<!-- 05 Comparison -->`.
2. Change the text between the tags. Keep sentences short.
3. House rules: no em dashes, no prices anywhere, all figures and handles are invented and labeled as sample data, and every call to action is
   `mailto:hello@kounted.co?subject=Free%20audit%20request`.
4. If you change the page title or description, update the matching `og:` and `twitter:` tags in the `<head>` too.

## Preview locally

```bash
python3 -m http.server 4173 --directory site
```

Then open http://localhost:4173.

## Redeploy

Commit and push to `main`. The GitHub Actions workflow publishes `site/` to GitHub Pages in about a minute. You can watch it under the repo's Actions tab, or run it by hand from there with "Run workflow".

```bash
git add -A
git commit -m "Update copy"
git push
```

## Social image

`site/og-image.png` is 1200x630. If the headline changes, regenerate it from a screenshot of a 1200x630 page in the same style, or ask for it to be rebuilt.
