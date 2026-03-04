# How to Publish Your Twisday Blog (Step by Step)

You have: the blog folder on your computer + the domain **twisday.com**.  
Goal: your blog live at **https://twisday.com**.

We’ll use **GitHub** to host the site and connect your domain. No coding required—just follow the steps.

---

## Part 1: Get your blog on GitHub

### Step 1: Create a GitHub account (if you don’t have one)

1. Go to **https://github.com**
2. Click **Sign up**
3. Enter email, password, username. Finish sign-up and verify your email.

---

### Step 2: Install Git on your computer

Git is a tool that uploads your files to GitHub.

- **Mac:** Open **Terminal** (search “Terminal” in Spotlight). Run:
  ```bash
  xcode-select --install
  ```
  Click **Install** in the popup. When it’s done, Git is installed.

- **Windows:** Go to **https://git-scm.com/download/win** and download. Run the installer; keep the default options and click Next until Finish.

To check it worked, open Terminal (Mac) or **Git Bash** (Windows) and type:
```bash
git --version
```
You should see something like `git version 2.x.x`.

---

### Step 3: Create a new folder with only the blog files

GitHub Pages needs the blog files at the **root** of the project (not inside a “blog” folder). So we put a copy of the blog contents in a new folder.

**On Mac:**

1. Open **Terminal**.
2. Run these lines one by one (press Enter after each). Replace `YOUR_MAC_USERNAME` with your Mac username (the name of your home folder):

```bash
cd Desktop
mkdir twisday-site
cd twisday-site
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/index.html" .
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/post.html" .
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/styles.css" .
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/app.js" .
cp "/Users/rajaedhunuri/Desktop/Job Application/blog/posts.json" .
```

**On Windows:**

1. Open File Explorer.
2. Go to your **Desktop**.
3. Create a new folder named **twisday-site**.
4. Open the folder where your blog is: `Job Application\blog`
5. Copy these 5 files into **twisday-site** (drag and drop or Copy/Paste):
   - `index.html`
   - `post.html`
   - `styles.css`
   - `app.js`
   - `posts.json`

You should now have a folder **twisday-site** with exactly those 5 files inside (and nothing else).

---

### Step 4: Create a new repository on GitHub

1. Log in to **https://github.com**
2. Click the **+** at the top right → **New repository**
3. Fill in:
   - **Repository name:** `twisday-site` (or any name you like)
   - **Description:** optional (e.g. “My blog”)
   - Leave **Public** selected
   - Do **not** check “Add a README” or “Add .gitignore”
4. Click **Create repository**

You’ll see a page that says “Quick setup — if you’ve done this kind of thing before”. We’ll use the “push an existing repository” commands in the next step.

---

### Step 5: Upload your blog folder to GitHub

**On Mac:** Open **Terminal**.

**On Windows:** Open **Git Bash** (search for it in the Start menu).

Then run these commands **one by one**. Replace `YOUR_GITHUB_USERNAME` with your real GitHub username (e.g. if your profile is github.com/rajaedhunuri, use `rajaedhunuri`).

```bash
cd Desktop/twisday-site
```

(On Windows with Git Bash, use: `cd Desktop/twisday-site` — same thing.)

```bash
git init
```
```bash
git add .
```
```bash
git commit -m "First version of my blog"
```
```bash
git branch -M main
```
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/twisday-site.git
```
```bash
git push -u origin main
```

When it asks for username and password:
- **Username:** your GitHub username  
- **Password:** use a **Personal Access Token**, not your normal password. To create one: GitHub → your profile picture (top right) → **Settings** → **Developer settings** (left) → **Personal access tokens** → **Tokens (classic)** → **Generate new token**. Give it a name, check **repo**, then Generate. Copy the token and paste it when Git asks for a password.

After `git push` finishes, your blog files are on GitHub.

---

### Step 6: Turn on GitHub Pages

1. On GitHub, open your repository (**YOUR_USERNAME/twisday-site**).
2. Click **Settings** (top menu of the repo).
3. In the left sidebar, click **Pages** (under “Code and automation” or “Build and deployment”).
4. Under **Build and deployment**:
   - **Source:** choose **Deploy from a branch**
   - **Branch:** choose **main**
   - **Folder:** choose **/ (root)**
5. Click **Save**.

Wait 1–2 minutes. Then open: **https://YOUR_GITHUB_USERNAME.github.io/twisday-site/**  
You should see your blog. (If the repo name is different, use that name in the URL.)

---

## Part 2: Use your domain twisday.com

### Step 7: Add twisday.com in GitHub

1. Still in your repo: **Settings** → **Pages**.
2. Under **Custom domain**, type: **twisday.com**
3. Click **Save**.
4. GitHub will show a box with **DNS records**. Keep this page open—you’ll need it for the next step. It might show:
   - **A records** with 4 IP addresses (e.g. 185.199.108.153, 185.199.109.153, …)
   - Or a **CNAME** (e.g. YOUR_USERNAME.github.io)

---

### Step 8: Point your domain to GitHub (DNS)

Your domain **twisday.com** was bought at a company (registrar). Examples: **Namecheap**, **GoDaddy**, **Google Domains**, **Cloudflare**, **Porkbun**. You need to log in there and add the records GitHub showed you.

**Find where you manage twisday.com:**  
Check your email for “twisday.com” — the receipt or account info will say which company it’s with. Log in to that company’s website.

**Find DNS settings:**  
Look for something like **DNS**, **DNS Settings**, **Manage DNS**, or **Nameservers** for twisday.com. Open that.

**Add the records GitHub gave you:**

- If GitHub showed **4 A records** (IP addresses):
  - Add 4 **A** records:
    - **Host/Name:** `@` (or leave blank, or “apex” — depends on the registrar)
    - **Value/Points to:** each of the 4 IPs (one record per IP)
  - **TTL:** leave default (e.g. 300 or Auto)

- If you prefer **www.twisday.com**:
  - Add one **CNAME** record:
    - **Host/Name:** `www`
    - **Value/Points to:** `YOUR_GITHUB_USERNAME.github.io` (your real GitHub username)
  - Then in GitHub **Settings → Pages**, set Custom domain to **www.twisday.com** instead of twisday.com.

Save the DNS settings at your registrar.

---

### Step 9: Wait for DNS and turn on HTTPS

- **Wait:** DNS can take 5 minutes to 48 hours. Often it’s 10–30 minutes.
- On GitHub **Settings → Pages**, the **Custom domain** section will eventually show a green check: **DNS check successful**.
- When you see that, check the box **Enforce HTTPS** (same page) and save.

---

### Step 10: Open your blog

Visit **https://twisday.com** in your browser. Your blog should load.

If it doesn’t:
- Wait a bit longer for DNS.
- Double-check the A records (all 4 IPs) at your registrar match exactly what GitHub shows.
- Try in an incognito/private window.

---

## Summary

| Step | What you did |
|------|------------------|
| 1 | GitHub account |
| 2 | Installed Git |
| 3 | Created twisday-site folder with the 5 blog files |
| 4 | Created a new repo on GitHub |
| 5 | Pushed the folder to GitHub with Git |
| 6 | Turned on Pages (branch: main, folder: root) |
| 7 | Added twisday.com as custom domain in GitHub |
| 8 | Added GitHub’s A (or CNAME) records at your domain registrar |
| 9 | Waited for DNS, then enabled HTTPS |
| 10 | Opened https://twisday.com |

---

## Updating your blog later (new posts)

1. Edit **posts.json** in your **twisday-site** folder (or in **Job Application/blog** and then copy the new posts.json into twisday-site).
2. In Terminal/Git Bash, in the twisday-site folder, run:
   ```bash
   git add posts.json
   git commit -m "New post"
   git push
   ```
3. In 1–2 minutes the live site will show the new post.

If you tell me which company you use for twisday.com (e.g. Namecheap, GoDaddy), I can give you the exact click-by-click for that registrar’s DNS page.
