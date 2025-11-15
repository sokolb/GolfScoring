/**
 * Configuration module for environment-specific settings
 */

const config = {
    // API base URL - defaults to localhost for development
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:8082",
};

export default config;
