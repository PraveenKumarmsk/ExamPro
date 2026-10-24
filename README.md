# ExamPro — Smart Exam Preparation

A responsive front-end foundation for an Indian competitive-exam preparation platform.

## Status

**Phase 1 — Landing page and sub-pages (static, working).**
Backend, authentication, database, test engine, admin, and payments are **not yet implemented**.

## File structure

- `index.html` — landing page
- `pages/` — all sub-pages
- `assets/css/style.css` — shared styles (light + dark mode)
- `assets/js/data.js` — configurable exam/test/plan data (replace with API later)
- `assets/js/app.js` — header/footer injection, theme, helpers

## Running locally

No build step. Just serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## 📄 License

Copyright © 2026 Praveen Kumar. All Rights Reserved.

This project is proprietary. Unauthorized copying, modification, distribution, or commercial use of the source code is prohibited without prior written permission from the copyright owner.

For more information, see the [LICENSE](LICENSE) file.
