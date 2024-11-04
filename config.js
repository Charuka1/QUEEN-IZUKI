const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID : process.env.SESSION_ID === undefined ? 'cEQXyIDK#khG8zfTJaBKWm7YDwuoHNk3h96i3XVhFLtuBzWhNff8' : process.env.SESSION_ID ,
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN === undefined ? "" : process.env.GITHUB_AUTH_TOKEN,
GITHUB_USERNAME: process.env.GITHUB_USERNAME === undefined ? "" : process.env.GITHUB_USERNAME,
BOT_NUMBER: process.env.BOT_NUMBER === undefined ? "" : process.env.BOT_NUMBER,
};
