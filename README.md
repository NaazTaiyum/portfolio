# Nazifa Tabassum Nabila · Research portfolio

My research portfolio covers federated learning, medical image analysis, neuroimaging and resource-efficient machine learning.

The site uses hash routing under [naaztaiyum.github.io/portfolio](https://naaztaiyum.github.io/portfolio/). GitHub Actions builds and deploys the site on pushes to `main`.

## Local development

```sh
npm ci
npm run dev
npm run lint
npm run build
node scripts/check-content.mjs
```

Site copy lives in `src/data/site.ts` and project content lives in `src/data/projects.ts` and `src/data/deep.ts`. Content marked `verify: true` is excluded from the site. Add an approved CV as `public/Nazifa_Nabila_CV.pdf` to enable the download link.

The optional benchmark figures are held in `design/pending/budgetaware-hpo/`. Move them back under `public/projects/` if the project and its deep page are confirmed for publication.

The contact form requires the EmailJS settings in `.env.example`. The email link works without those settings.
