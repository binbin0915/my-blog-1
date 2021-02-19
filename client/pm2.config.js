module.exports = {
    apps: [
        {
            name: 'next-app',
            script: './server.js',
            cwd: './', // 当前工作路径
            watch: false,
            instances: 2,  // 启动2个实例
            exec_mode: "cluster",
            max_memory_restart: "100M",
            env: {
                NODE_ENV: 'development',
                PORT: 3000
            },
            env_qa: {
                NODE_ENV: 'production',
                RUN_ENV: 'qa',
                PORT: 3000
            },
            env_production: {
                NODE_ENV: 'production',
                RUN_ENV: 'prod',
                PORT: 3000
            },
            out_file: './logs/out.log', // 普通日志路径
            error_file: './logs/err.log', // 错误日志路径
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm:ss' // 设置日志的日期格式
        }
    ]
};
