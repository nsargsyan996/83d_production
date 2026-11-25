# 83D Production: landing page

Live at **https://83d.am**

The one-page website of 83D Production, a custom 3D printing studio in Yerevan.
It is a static site (plain HTML, CSS and JavaScript), with no build step and no dependencies to install.

The site has three pages, one per language: English at `/`, Russian at `/ru/` and Armenian at `/hy/`.
The switch in the header links between them, and each page carries its text in the HTML, so search engines index all three.
Every action button opens a WhatsApp chat with the studio, with a first message in the page's language.

## Run it

### Option 1: open the file

Double-click `index.html`, or drag it into a browser window. Everything works from the file,
including the language switch and the scroll animations.

### Option 2: a local web server (closer to how it runs online)

From the project folder, run one of these, then open the address it prints:

```bash
# with Node.js
npx serve .

# with Python 3
python3 -m http.server 8000      # then open http://localhost:8000
```

To try it on your phone, start the server on your computer and open `http://<your computer's IP>:8000`
on the phone, with both on the same Wi-Fi.

## Put it online at 83d.am

The site is served from this repository with GitHub Pages, on the domain **83d.am**
(the `CNAME` file in the root already names it).

1. **Turn on Pages:** in this repository go to *Settings › Pages*, choose *Deploy from a branch*,
   pick `main` and `/ (root)`, and save.
2. **Set the custom domain:** on the same page enter `83d.am` under *Custom domain* and save.
3. **Point the domain at GitHub** at the registrar where 83d.am is managed:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `nsargsyan996.github.io` |

4. **Turn on HTTPS:** once the DNS check on the Pages settings turns green (from a few minutes up to a day),
   tick *Enforce HTTPS*.

Every push to `main` then updates https://83d.am within a minute or two.

### Search engines

- Each page names its own address (`canonical`) and the other two languages (`hreflang`), and the sitemap lists all three.
- Each page describes the business for Google (structured data: 83D Production, Yerevan, phone, info@83d.am, logo).
- Link previews (Facebook, Telegram, WhatsApp, X) have the title, description and picture in each language.
- Once the site is live: add 83d.am to [Google Search Console](https://search.google.com/search-console) and
  [Yandex Webmaster](https://webmaster.yandex.com), submit `https://83d.am/sitemap.xml` in both, and create a
  Google Business Profile for 83D Production in Yerevan.

Another static host (Netlify, Vercel, your own server) works too: upload the files as they are,
with no build command, and point 83d.am at that host instead.

## Files

```text
CNAME                 the domain for GitHub Pages (83d.am)
robots.txt            lets search engines in and names the sitemap
sitemap.xml           the one page, for search engines
index.html            the English page
ru/index.html         the Russian page
hy/index.html         the Armenian page
styles.css            the look and every animation
app.js                smooth scrolling, the scroll scenes, the menu and the footer reveal
favicon.png           the tab icon
apple-touch-icon.png  the icon a phone uses when the site is saved to the home screen
share.jpg             the picture shown when the link is shared
assets/lenis.min.js   smooth scrolling (Lenis, MIT licence in assets/lenis.LICENSE.txt)
assets/img/           the logo for the paper ground, the logo in champagne, the brand render
```

## Common changes

- **Texts:** each language's text is in its own page: `index.html` (English), `ru/index.html` and `hy/index.html`.
  Change a sentence in each of the three.
- **WhatsApp number:** search for `37443633630` in the three pages and replace it
  (international format, digits only). The pre-filled messages are the `text=` part of those links.
- **Phone and email in the footer:** at the end of `index.html` (the support email is info@83d.am).
- **Colours:** the variables at the top of `styles.css` (`--paper`, `--ink`, `--copper`, `--champ`).
- **Fonts:** loaded from Google Fonts in the `<head>` of `index.html`: Unbounded (headings), Manrope (text),
  Caveat (handwriting) and Noto Sans Armenian (Armenian text).

## Notes

- Visitors who ask their system for less motion get the page at rest, with all text readable.
- The 3D objects (the printed ∞, the name tag, the gear and the others) are drawn in code.
  Replace them with photographs of real prints when they are available.
- Contact: info@83d.am, +374 43 633 630 (WhatsApp on the same number).
- Before launch: have a native speaker check the Armenian texts.
