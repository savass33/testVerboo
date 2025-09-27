#!/bin/sh
set -e

# Wait for database
python wait_for_db.py

# Start database
python init_db.py

# Start Flask with Gunicorn
exec gunicorn --workers 3 --bind 0.0.0.0:5000 --timeout 60 main:app