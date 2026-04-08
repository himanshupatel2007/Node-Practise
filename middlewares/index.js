const fs = require('fs')

function LogReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
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