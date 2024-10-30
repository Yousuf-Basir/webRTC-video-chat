// ecosystem.config.cjs
const config = {
  apps: [
    {
      name: 'webrtc-video-chat-frontend',
      script: 'npm',
      args: 'run frontend',
      cwd: './',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'webrtc-video-chat-backend',
      script: 'npm',
      args: 'run backend',
      cwd: './',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

module.exports = config;