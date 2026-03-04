# Twisday (twisday.com)

A simple personal blog for writing your thoughts and feelings. New post every weekend. Built for **twisday.com**.

## Run locally

The blog loads posts from `posts.json`, so you need a local web server (opening `index.html` directly in the browser won’t load the file).

**Option 1 — Python (if you have Python installed):**
```bash
cd blog
python3 -m http.server 8000
```
Then open: **http://localhost:8000**

**Option 2 — Node (if you have Node installed):**
```bash
cd blog
npx serve
```
Then open the URL it prints (e.g. http://localhost:3000).

---

## Adding a new post (every weekend)

1. Open **`posts.json`** in any text editor.
2. Add a new object to the **`posts`** array. Put it **at the top** (first in the array) so the newest post appears first:

```json
{
  "title": "Your post title",
  "date": "2025-03-08",
  "excerpt": "Short line shown on the home page (optional).",
  "content": "First paragraph here.\n\nSecond paragraph after a blank line.\n\nYou can write as much as you like. New paragraphs need a blank line between them."
}
```

3. Save the file and refresh the blog in your browser.

- **title** — Shown on the home page and at the top of the post.
- **date** — Use `YYYY-MM-DD` (e.g. `2025-03-08` for March 8, 2025).
- **excerpt** — Optional. One line shown on the home page. If you leave it out, the first part of `content` is used.
- **content** — Your full post. Use `\n\n` for a new paragraph.

That’s it. No build step, no database—just edit `posts.json` and you’re done.

## Deploy with GitHub Pages (then use twisday.com)

GitHub Pages serves from the **root** of your repo (or from `/docs`). So the repo should contain the blog files at the **root** — not inside a `blog` folder.

### 1. Create a new repo and push the blog

```bash
# Create a new folder for the GitHub repo (e.g. twisday-pages)
mkdir twisday-pages
cd twisday-pages

# Copy the blog files into this folder (so index.html, post.html, etc. are at root)
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/"* .
# On Windows or if the path is different, copy index.html, post.html, styles.css, app.js, posts.json (and README if you want) into twisday-pages.

# Start git and push to GitHub
git init
git add .
git commit -m "Initial commit: Twisday blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/twisday-pages.git
git push -u origin main
```

Create the repo on GitHub first: **GitHub.com → New repository** (e.g. name: `twisday-pages`), then use that URL in `git remote add origin`.

### 2. Turn on GitHub Pages

1. Open your repo on GitHub.
2. Go to **Settings → Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch.
   - **Branch**: `main` (or the branch that has the blog files at root).
   - **Folder**: `/ (root)`.
4. Click **Save**.

After a minute or two the site will be at **https://YOUR_USERNAME.github.io/twisday-pages/**.

### 3. Add twisday.com and point DNS

**Step A — Add your domain in the host’s dashboard**

1. In your repo go to **Settings → Pages**.
2. Under **Custom domain**, type: `twisday.com`
3. Click **Save**. GitHub will show the DNS records you need.

**Step B — Point DNS at your registrar**

Your *registrar* is where you bought twisday.com (e.g. Namecheap, GoDaddy, Google Domains, Cloudflare).

1. Log in there and open DNS settings for twisday.com.
2. Add the records GitHub shows you. Usually:
   - **A records** for apex `twisday.com`:  
     `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`  
     (use the exact values GitHub displays).
   - Or a **CNAME** for `www`: `www` → `YOUR_USERNAME.github.io` (if you use `www.twisday.com`).
3. Save at the registrar.

**Step C — Wait for DNS, then HTTPS**

- DNS can take a few minutes up to 48 hours. When it’s ready, GitHub will show a green **DNS check successful** in Settings → Pages.
- Turn on **Enforce HTTPS** in the same Pages settings.

After that, your blog is live at **https://twisday.com**.

---

## Other hosts: custom domain + DNS (same idea)

**Netlify** — Site settings → Domain management → Add custom domain → enter `twisday.com` → follow the A/CNAME records Netlify shows → add those at your registrar → wait for DNS.

**Vercel** — Project → Settings → Domains → Add `twisday.com` → add the A/CNAME records at your registrar → wait for DNS.

For any host: **(1)** Add twisday.com in the host’s dashboard, **(2)** copy the A or CNAME records they give you and add them at your domain registrar, **(3)** after DNS propagates, the site will be at **https://twisday.com**.
