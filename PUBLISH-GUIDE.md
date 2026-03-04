# How to Publish Twisday.com (Godaddy & GitHub)

Your elegant new blog is ready! Since you purchased your domain **Twisday.com** from GoDaddy, the easiest and completely **free** way to host your website is using **GitHub Pages**. 

Here are the simple, step-by-step instructions.

---

## Step 1: Upload Your Code to GitHub

First, we need to put your code on GitHub so it can be hosted on the internet.

1. Go to [GitHub.com](https://github.com) and create a free account (if you don't have one).
2. Once logged in, click the **"+"** icon in the top right corner and select **New repository**.
3. Name the repository: `twisday-blog`
4. Leave it as **Public** and click **Create repository**.
5. You will see a screen with some code snippets. Look for the link near the top that says **"uploading an existing file"** and click it.
6. Drag and drop the **5 files** from your desktop `twisday.com/blog` folder directly into the GitHub window:
   - `index.html`
   - `post.html`
   - `styles.css`
   - `app.js`
   - `posts.js`
7. Click the green **Commit changes** button at the bottom.

---

## Step 2: Turn on GitHub Pages (Free Hosting)

Now that your code is on GitHub, let's turn it into a website.

1. On your GitHub repository page, click the **⚙️ Settings** tab at the top.
2. On the left sidebar, scroll down and click on **Pages**.
3. Under the "Build and deployment" section, find the **Branch** dropdown.
4. Change it from *None* to **main** (or **master**), and leave the folder as `/ (root)`.
5. Click **Save**. 

*GitHub is now building your site. It will take about 1-2 minutes.*

---

## Step 3: Connect Your GoDaddy Domain (Twisday.com)

Now we connect your GitHub website to your GoDaddy domain.

### In GitHub:
1. Stay on that same **Pages** settings screen. 
2. Scroll down to the **Custom domain** section.
3. Type in `www.twisday.com`
4. Click **Save**. 

### In GoDaddy:
1. Log into your **GoDaddy** account.
2. Go to your **My Products** page and find `twisday.com`.
3. Click **DNS** or **Manage DNS**.
4. You need to add **four "A" Records** that point to GitHub's servers. If there are existing "A" records with the Name `@` (or empty), edit them or delete them and create these four new ones:
   - **Type:** `A` | **Name:** `@` | **Value:** `185.199.108.153`
   - **Type:** `A` | **Name:** `@` | **Value:** `185.199.109.153`
   - **Type:** `A` | **Name:** `@` | **Value:** `185.199.110.153`
   - **Type:** `A` | **Name:** `@` | **Value:** `185.199.111.153`
5. Next, add or edit the **CNAME** record for `www`:
   - **Type:** `CNAME` | **Name:** `www` | **Value:** `YOUR_GITHUB_USERNAME.github.io` (replace this with your actual GitHub username).

---

## Step 4: Wait and Enforce HTTPS

DNS changes (connecting Godaddy to GitHub) can take anywhere from **10 minutes to a few hours**. 

1. Go back to your GitHub repository **Settings > Pages**.
2. Keep refreshing occasionally. Once the "DNS check successful" message appears in green, check the box that says **Enforce HTTPS**.

**You are done! 🎉**
Go to `https://www.twisday.com` and your beautiful new blog will be live for the world to see! 

---

### How to post a new blog later?
Whenever you write a new weekend post, simply open your `posts.js` file on your computer, add the new post at the top, and then drag-and-drop that single `posts.js` file into your GitHub repository to upload and overwrite it. The website will automatically update!
