#!/bin/bash
echo "Deploying all files..."
rsync -av --delete html/ /var/www/html/
echo "Deployment complete."