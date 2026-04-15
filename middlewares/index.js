const fs = require('fs')

function LogReqRes() {
    return (req, res, next) => {
        fs.appendFile(
            "./middlerwareLogs.txt",
            `${Date.now()} request resolved by hte middleware of ${req.method}\n`,
            (err) => {
                if (err) {
                    console.log(`Error:${err}`);
                }
            },
        );
        next();
    }
}

module.exports = LogReqRes