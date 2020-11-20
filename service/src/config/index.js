
const config = {}

for (let x in process.env) {
    const KOA_APP = /^KOA_APP_/i;
    if (KOA_APP.test(x)) {
        config[x] = process.env[x]
    }
}

module.exports = {
    ...config
}