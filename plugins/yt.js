const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('youtubedl-core');
const api = require("caliph-api");
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, getsize} = require('../lib/functions')
const dl2 = require('inrl-dl')
var descv =''
if(config.LANG === 'SI') descv = "Youtube වෙතින් videos බාගත කරයි."
else descv = "Download videos from Youtube."

var descs =''
if(config.LANG === 'SI') descs = "Youtube වෙතින් songs බාගත කරයි."
else descs = "Download songs from Youtube."

var descyt =''
if(config.LANG === 'SI') descyt = "Youtube වෙතින් video සහ songs බාගත කරයි."
else descyt = "Download videos and songs from Youtube."

var descsh =''
if(config.LANG === 'SI') descsh = "Youtube search බාගත කරයි."
else descsh = "Search and get details from youtube."

var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"

var urlneed =''
if(config.LANG === 'SI') urlneed = "*කරුණාකර Youtube url එකක් ලබා දෙන්න*"
else urlneed = "*Please give me youtube url..*"

var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```"
else imgmsg = "```Please write a few words!```"

var sizetoo =''
if(config.LANG === 'SI') sizetoo = "_This file size is too big_\n ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​  *මෙම file එක upload කිරීමට මෙම bot host වෙන platform එකේ bandwith එක ප්‍රමානවත් නැත !*"
else sizetoo =  "_This file size is too big_\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ *The bandwidth of the platform where this bot is hosted is not enough to upload this file!*"





cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: descsh,
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})

cmd({
    pattern: "yt",
    use: '.yt [song name or link]',
    react: "🎬",
    desc: descyt,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `*🎬📥QUEEN-IZUMI YT DOWNLOADER*

*✏️ ʀᴇꜱᴜʟᴛ:*
*🎭 ʀᴇǫᴜᴇꜱᴛᴇʀ:*

*◯──────────────────────────────────◯*_`

const sections = [
    {
title: "",
	rows: [
	    {title: "1", rowId: prefix + 'selectaud ' + q , description: 'DOWNLOAD SONG 🎙️'},
	    {title: "2", rowId: prefix + 'selectvid ' + q , description: 'DOWNLOAD VIDEO 🎞️'},
	    {title: "3", rowId: prefix + 'ytinfo ' + q , description: 'GET DETAILS ℹ️'} ,

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "🔢 Reply below number,",
  sections	
}

return await conn.replyList(from, listMessage ,{ quoted : mek })	
		    }
if(ytreg(q)){let dat = `*🎬📥QUEEN-IZUMI YT DOWNLOADER*

*✏️ ʀᴇꜱᴜʟᴛ:*
*🎭 ʀᴇǫᴜᴇꜱᴛᴇʀ:*

*◯──────────────────────────────────◯*_`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'ytdocs ' + anu.url , description: 'DOWNLOAD SONG 🎙️'},
	    {title: "2", rowId: prefix + 'ytdocv ' + anu.url , description: 'DOWNLOAD VIDEO 🎞️'},
	    {title: "3", rowId: prefix + 'ytinfo ' + anu.url , description: 'GET DETAILS ℹ️'} ,

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "🔢 Reply below number,",
  sections
  }

	     
return await conn.replyList(from, listMessage ,{ quoted : mek })
	    }
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `*🎬📥QUEEN-IZUMI YT DOWNLOADER*

*🎼 ꜱᴏɴɢ ɴᴀᴍᴇ: ${anu.title}*
*🎻 ᴄʜᴀɴɴᴇʟ: ${anu.author.name}*

*◯──────────────────────────────────◯*_`

const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'selectaud ' + q , description: 'DOWNLOAD SONG 🎙️'},
	    {title: "2", rowId: prefix + 'selectvid ' + q , description: 'DOWNLOAD VIDEO 🎞️'},
	    {title: "3", rowId: prefix + 'ytinfo ' + q , description: 'GET DETAILS ℹ️'} ,

	]
    } 
]
const listMessage = {
  image: {url: anu.thumbnail},
  caption: cap,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}

await conn.replyList(from, listMessage ,{ quoted : mek }) 

} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

cmd({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.video lelena',
    react: "📽️",
    desc: descv,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

   *SELECT VIDEO TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'selectvid1 ' + q , description: 'Normal type Videos 🎶'},
	    {title: "2", rowId: prefix + 'selectvid2 ' + q , description: 'Document type videos 📁'} ,

	]
    } 
]
const listMessage = {
  text: dat,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]
*SELECT VIDEO TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'selectvid1 ' + q , description: 'Normal type videos 🎶'},
	    {title: "2", rowId: prefix + 'selectvid2 ' + q , description: 'Document type videos 📁'} ,

	]
    } 
]
const listMessage = {
  text: dat,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections 
}	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	}
	
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

   *VIDEO DOWNLOADER*

*📃 Title:* ${anu.title}

*📺 Views:* ${anu.views}

*🕹️ Duration:* ${anu.timestamp}

*🔗 Url:* ${anu.url}`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'selectvid1 ' + anu.url , description: 'Normal type videos 🎶'},
	    {title: "2", rowId: prefix + 'selectvid2 ' + anu.url , description: 'Document type videos 📁'} ,

	]
    } 
]
const listMessage = {
  image: {url: anu.thumbnail},
  caption: cap,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}

await conn.replyList(from, listMessage ,{ quoted : mek }) 

} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

//---------------------------------------------------------------------------
cmd({
  alias: ["selectvid1"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + '360p ' + q , description: '320p Quality video'},
	    {title: "2", rowId: prefix + '480p ' + q , description: '480p Quality video'} ,
	    {title: "3", rowId: prefix + '720p ' + q , description: '720p Quality video'},
	    {title: "4", rowId: prefix + '1080p ' + q , description: '1080p Quality video'} 

	]
    } 
]
const listMessage = {
 text : dat ,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}
 
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
reply(N_FOUND)
l(e)
}
})
//---------------------------------------------------------------------------
cmd({
  alias: ["selectvid2"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + '36p ' + q , description: '320p Quality document'},
	    {title: "2", rowId: prefix + '48p ' + q , description: '480p Quality document'} ,
	    {title: "3", rowId: prefix + '72p ' + q , description: '720p Quality document'},
	    {title: "4", rowId: prefix + '108p ' + q , description: '1080p Quality document'} 

	]
    } 
]
const listMessage = {
 text : dat ,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}
 
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
reply(N_FOUND)
l(e)
}
})
//---------------------------------------------------------------------------

		    
cmd({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
    desc: descs,
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

   *SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'ytmp3 ' + q , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + 'ytdocs ' + q , description: 'Document type song 📂'},
	    {title: "3", rowId: prefix + 'ytinfo' + q , description: 'To see yt info ℹ️'} 

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

*SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'ytmp3 ' + q , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + 'ytdocs ' + q , description: 'Document type song 📂'},
	    {title: "3", rowId: prefix + 'ytinfo' + q , description: 'To see yt info ℹ️'} 

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

   *SONG DOWNLOADER*

*📃 Title:* ${anu.title}

*📺 Views:* ${anu.views}

*🕹️ Duration:* ${anu.timestamp}

*🔗 Url:* ${anu.url}`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'ytmp3 ' + anu.url , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + 'ytdocs ' + anu.url , description: 'Document type song 📂'},
	    {title: "3", rowId: prefix + 'ytinfo' + anu.url , description: 'To see yt info ℹ️'} 

	]
    } 
]
const listMessage = {
  image: {url: anu.thumbnail},
  caption: cap,
  footer: `*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections	
}

await conn.replyList(from, listMessage ,{ quoted : mek }) 

} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

cmd({
  alias: ["selectaud"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
  {title: "1", rowId: prefix + 'ytmp3 ' + q , description: 'Normal type song 🎶'}, 
  {title: "2", rowId: prefix + 'ytdocs ' + q , description: 'Document type video 📁'},
  {title: "3", rowId: prefix + 'ytinfo ' + q , description: 'Info of the song ℹ️'}, 	
]
    } 
]
  const listMessage = {
 text : dat ,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}
 
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
reply(N_FOUND)
l(e)
}
})


cmd({
  alias: ["selectvid"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
  {title: "1", rowId: prefix + 'selectvid1 ' + q , description: 'Normal type Videos'}, 
  {title: "2", rowId: prefix + 'selectvid2 ' + q , description: 'Document type Videos'}
]
    } 
]
  const listMessage = {
 text : dat ,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}
 
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
reply(N_FOUND)
l(e)
}
})



//===================================================================================================

cmd({
  pattern: "360p",
  use: '.360p <video url>',
  react: "📽️",
  desc: "Download yt videos.",
  category: "",
  filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['360p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['360p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "480p",
  use: '.480p <video url>',
  react: "📽️",
  desc: "Download yt videos.",
  category: "",
  filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['480p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['480p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
    pattern: "720p",
    use: '.720p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['720p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['720p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "1080p",
  use: '.1080p <video url>',
  react: "📽️",
  desc: "Download yt videos.",
  category: "",
  filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['1080p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['1080p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "ytmp3",
  use: '.ytmp3 <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(q, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
let sendaE =  await conn.sendMessage(from, { audio: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName:  `${titleYt}.mp3` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎼', key: sendaE.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo)
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "ytmp4",
  use: '.ytmp3 <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(q, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
let sendaE =  await conn.sendMessage(from, { video: fs.readFileSync(`./${randomName}`), mimetype: 'video/mp4', fileName:  `${titleYt}.mp3` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎼', key: sendaE.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo)
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "ytdocs",
  use: '.ytdoc <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(q, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
  let senda =  await conn.sendMessage(from, { document: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName: titleYt + '.mp3',caption: config.FOOTER  }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo);
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
  pattern: "ytdocv",
  use: '.ytdoc <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp4");
const stream = ytdl(q, {
      filter: (info) => info.itag == 22 || info.itag == 18,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
  let senda =  await conn.sendMessage(from, { document: fs.readFileSync(`./${randomName}`), mimetype: 'document/mp4', fileName: titleYt + '.mp4',caption: config.FOOTER  }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo);
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})

//---------------------------------------------------------------------------

cmd({
    pattern: "ytinfo",
    use: '.yt lelena',
    react: "📽️",
    desc: descyt,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `┌───[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

  *SELECT TYPE*`
const buttons = []
const buttonMessage = {
    caption: dat,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `┌───[🧚 ＱＵＥＥＮ -ＩＺＵＭＩ - ＭＤ 🧚]

   *YT DOWNLOADER*

╏🎀 *Title:* ${anu.title}
⦁
╏🌐 *Duration:* ${anu.timestamp}
⦁
╏👀 *Viewers:* ${anu.views}
⦁
╏⬆️ *Uploaded:* ${anu.ago}
⦁
╏👽 *Author:* ${anu.author.name}
⦁
╏📡 *Url* : ${anu.url}`
    
const buttons = []
const buttonMessage = {
    image: {url: anu.thumbnail},
    caption: cap,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage)
} catch (e) {
  reply(N_FOUND)
  l(e)
}
})


cmd({
    pattern: "36p",
    use: '.360p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['360p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { document: {url: await yt.video['360p'].download() },fileName: 'video.mp4', mimetype: 'video/mp4' ,caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})




cmd({
    pattern: "48p",
    use: '.480p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['480p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { document: {url: await yt.video['480p'].download() },fileName: 'video.mp4', mimetype: 'video/mp4' ,caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

				      

cmd({
    pattern: "72p",
    use: '.720p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['720p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { document: {url: await yt.video['720p'].download() },fileName: 'video.mp4', mimetype: 'video/mp4' ,caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})


cmd({
    pattern: "108p",
    use: '.1080p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['1080p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { document: {url: await yt.video['1080p'].download() },fileName: 'video.mp4', mimetype: 'video/mp4' ,caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})
