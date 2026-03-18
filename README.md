# Roseth Perera Portfolio

React portfolio site built with Vite and prepared for free GitHub Pages deployment.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Free deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload this folder to the repository.
3. Push it to the `main` branch.
4. In GitHub, go to `Settings > Pages`.
5. Set `Source` to `GitHub Actions`.
6. Push again if needed. The included workflow at `.github/workflows/deploy.yml` will publish the site automatically.

The app uses hash-based navigation, so project and resume pages work correctly on GitHub Pages without extra server configuration.
