#!/bin/bash

# Script to migrate test files from Jest/Enzyme to Vitest/React Testing Library

# Find all test files
find ./src -name "*.test.js" -type f | while read file; do
    echo "Processing: $file"
    
    # Replace jest with vitest imports
    sed -i '' 's/jest\.fn()/vi.fn()/g' "$file"
    sed -i '' 's/jest\.mock(/vi.mock(/g' "$file"
    
    # Add vitest imports if not already present
    if ! grep -q "import.*vitest" "$file"; then
        # Check if there are already imports from enzyme
        if grep -q "import.*enzyme" "$file"; then
            # Replace enzyme imports with React Testing Library
            sed -i '' '1i\
import { describe, it, expect, beforeEach, afterEach, vi, test } from "vitest";
' "$file"
        fi
    fi
    
    echo "Completed: $file"
done

echo "Migration script completed!"
