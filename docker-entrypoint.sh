#!/bin/sh
set -e

# Use Railway's PORT environment variable, default to 80 if not set
PORT=${PORT:-80}
export PORT

# Substitute PORT in nginx config template
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Verify the config was created
if [ ! -f /etc/nginx/conf.d/default.conf ]; then
    echo "ERROR: Failed to create nginx config"
    exit 1
fi

# Test nginx configuration
nginx -t

# Start nginx
echo "Starting nginx on port ${PORT}"
exec nginx -g 'daemon off;'

