module.exports = {
  apps: [{
    name: 'tutorial',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-205-81-255.compute-1.amazonaws.com',
      key: '~/.ssh/auth_dev_server.pem',
      ref: 'origin/master',
      repo: 'git@github.com:vasa-develop/AuthProtocol.git',
      path: '/home/ubuntu/tutorial',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
