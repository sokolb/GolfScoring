/**
 * Configuration module for environment-specific settings
 * Uses Vite's import.meta.env for environment variables
 */

const config = {
    // API base URL - defaults to localhost for development
    apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:8082",
};

export default config;
