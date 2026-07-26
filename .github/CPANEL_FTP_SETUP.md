# cPanel FTP Deployment Setup

To use the GitHub Actions workflow in .github/workflows/deploy.yml, add these repository secrets in GitHub:

- FTP_HOST
- FTP_USERNAME
- FTP_PASSWORD
- FTP_PORT (optional, default 21)
- FTP_SERVER_DIR (the remote folder on cPanel, for example: public_html/)

Example values:
- FTP_HOST: ftp.yourdomain.com
- FTP_USERNAME: your_cpanel_username
- FTP_PASSWORD: your_ftp_password
- FTP_PORT: 21
- FTP_SERVER_DIR: public_html/

Notes:
- This workflow builds the frontend from the client folder and uploads the contents of client/dist to your cPanel hosting.
- If your hosting uses plain FTP instead of FTPS, change `protocol: ftps` to `protocol: ftp` in the workflow.
- For a React/Vite app, the built files are served from the `dist` folder.
