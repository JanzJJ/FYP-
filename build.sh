#!/bin/bash
set -e

echo "Installing backend dependencies..."
pip install -r backend/requirements.txt

echo "Build completed successfully!"
