# Legacy Files Notice

This directory contains legacy files from the Create React App (CRA) setup. The project has been migrated to Vite.

## Files in this directory:

-   **index.html** - Legacy template file from CRA. **Not used by Vite.** The actual index.html used by Vite is at the project root (`client-app/index.html`).
-   **manifest.json** - Web app manifest (still used for PWA features if needed)
-   **favicon.ico** - Site favicon (still used)
-   **Players_Testing.json** - Test data file (still used for development/testing)
-   **Teams_Testing.json** - Test data file (still used for development/testing)

## Migration Notes

With Vite:

-   The root `index.html` file serves as the entry point (not `public/index.html`)
-   Files in `public/` are served at the root path during dev and copied as-is during build
-   `%PUBLIC_URL%` placeholders are no longer needed - use absolute paths like `/manifest.json`

## Should these files be deleted?

-   **index.html** - Can be safely deleted (kept for reference)
-   **manifest.json** - Keep if you want PWA support
-   **favicon.ico** - Keep (used by the app)
-   **Test JSON files** - Keep (used for development/testing)

For more details about the migration, see `MIGRATION_SUMMARY.md` in the project root.
