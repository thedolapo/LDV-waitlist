# Deploy LDV Waitlist to GitHub Pages + Custom Domain

## 1. Push code to GitHub

From your project folder:

```bash
cd "/Users/dolapoayoade/2026 Projects/LDV 26"

# Add the remote (if not already added)
git remote add origin https://github.com/thedolapo/LDV-waitlist.git

# If you already have a different remote, set this as origin:
# git remote set-url origin https://github.com/thedolapo/LDV-waitlist.git

# Commit any uncommitted changes, then push
git add -A
git commit -m "Prepare for GitHub Pages deploy"
git branch -M main
git push -u origin main
```

If your default branch is `master`, use `git push -u origin master` and the workflow will still run (it triggers on both `main` and `master`).

---

## 2. Turn on GitHub Pages

1. Open **https://github.com/thedolapo/LDV-waitlist**
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. After the first push, the **Deploy to GitHub Pages** workflow will run. When it finishes, the site will be at:
   - **https://thedolapo.github.io/LDV-waitlist/**

### Allow the workflow to deploy

1. Go to **Settings → Actions → General**
2. Under **Workflow permissions**, choose **Read and write permissions**
3. Save

---

## 3. Use ldvsupply.com (go54)

### A. Tell GitHub your domain

1. In the repo: **Settings → Pages**
2. Under **Custom domain**, enter: **ldvsupply.com**
3. Click **Save**. GitHub will show DNS instructions.

### B. Point ldvsupply.com at GitHub (in go54)

In go54’s DNS for **ldvsupply.com**:

**Use the root domain (ldvsupply.com):**

- Add **4 A records** (one for each IP). Host is usually `@` or blank for root:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

**Optional – use www as well:**

- Add a **CNAME** record:
  - **Name/host:** `www`
  - **Value/target:** `thedolapo.github.io`

Save DNS. Propagation can take a few minutes up to 48 hours.

The app is already built with `base: '/'` so it will work at **https://ldvsupply.com**.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Add remote, commit, push to `thedolapo/LDV-waitlist` |
| 2 | Settings → Pages → Source: **GitHub Actions**; Actions → **Read and write** |
| 3 | In go54: add the 4 A records for **ldvsupply.com** (and optional www CNAME) |
| 4 | Settings → Pages → Custom domain: **ldvsupply.com** |
