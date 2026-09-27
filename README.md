# Nexura Studio — GitHub Pages Website

## What this is
A static, GitHub Pages-compatible portfolio/sales website with:
- responsive landing page
- services
- video/image portfolio
- tracking architecture presentation
- GA4/GTM/Meta/Clarity configuration fields
- WhatsApp/Messenger/Call/Meeting CTAs
- FAQ
- local admin editor
- optional GitHub Contents API publisher

## Important limitation: static hosting and admin security
GitHub Pages is static hosting. It does not provide a secure server-side login/database. Therefore `admin.html` is a client-side editor.

The password in `admin.js` is NOT a secure production authentication system. A knowledgeable visitor can inspect public JavaScript. Do not use it to protect private information.

For a real secure CMS, use a server-side/authenticated CMS or an OAuth/GitHub App architecture. The optional GitHub publisher here is a convenience tool: it asks for a fine-grained GitHub token at runtime, keeps it only in memory, and uses it to update `content.json`. Never save that token in the repository.

## GitHub Pages deployment
1. Create a repository.
2. Upload all files and folders, including `.nojekyll`.
3. Settings → Pages → choose the branch/folder containing `index.html`.
4. Open the published URL.
GitHub Pages is a static hosting service; it publishes files from a repository. See official docs:
https://docs.github.com/en/pages

## Images and videos
Put your real media in `assets/`, for example:
- assets/hero.jpg
- assets/project-01.jpg
- assets/project-01.mp4

Then open `admin.html` and set the relative paths in Portfolio/Content.

Do not upload huge raw 4K videos directly to GitHub if you can avoid it. For a faster website, use compressed MP4/WebM files or an external video/CDN host and put the public URL into the media field.

## Tracking
The recommended architecture is:
Website → GTM → GA4 / Meta Pixel / Clarity

Put your GTM container ID into Admin → Tracking → GTM ID and publish content.json.

Then configure the actual GA4, Meta Pixel and Clarity tags inside GTM. Do not paste secret API tokens into this website.

Microsoft documents Clarity's official GTM integration here:
https://learn.microsoft.com/en-us/clarity/third-party-integrations/google-tag-manager

## GA4 / Meta / Clarity
The website stores IDs in `content.json` for your reference. The actual tags should be created and published in your GTM container according to the current vendor documentation.

For Clarity, Microsoft supports installation through GTM and also documents GA integration.

## Admin workflow without GitHub API
1. Open `/admin.html`.
2. Enter the demo admin password you configured.
3. Edit content.
4. Click Download content.json.
5. Upload the new content.json to your GitHub repository.
6. Upload new images/videos into `assets/`.
7. Wait for GitHub Pages to publish.

## Optional direct publishing
Admin → GitHub Publish can update `content.json` through GitHub's Contents API.

Use a fine-grained token restricted to the exact repository and minimum required permissions. Do not save it in this repository or any JavaScript file.

## Recommended production upgrade
For a real client-facing CMS with secure login, media uploads, user roles and database storage, use an authenticated CMS/backend instead of relying on a client-side password.
