//Subscribe MFarelS CH
//Follow Instagram @mfarelsyahtiawan
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const moment = require('moment-timezone')
const get = require('got')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const { help, syarat, info, donate } = require('./lib/cmd')
const { stdout } = require('process')

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (farelsukasamazahra, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('/')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }

        const mess = {
            magernulissatu: 'Harap Tunggu, Bot Sedang Menulis Buku 1!~'
            }
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await farelsukasamazahra.getHostNumber()
        const blockNumber = await farelsukasamazahra.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await farelsukasamazahra.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = ["628xxx@c.us"]
        const isOwner = ownerNumber.includes(sender.id)
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('/')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('/')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isOwner) return
        switch(command) {
                case '#magernulis1': 
                case '/magernulis1':
            if (args.length === 1) return farelsukasamazahra.reply(from, 'Ketik /magernulis1 [teks]', id)
            farelsukasamazahra.sendText(from, mess.magernulissatu, id)
            const text = body.slice(12) 
            const splitText = text.replace(/(\S+\s*){1,7.5}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 28).join('\n')
            spawn('convert', [
                './gbr/mager/magernulis1.jpg',
                '-font',
                'Indie-Flower',
                '-size',
                '600x760',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                fixHeight,
                './gbr/mager/magernulis1√.jpg'
            ])
            .on('error', () => farelsukasamazahra.reply(from, 'Error Bjeer\nMungkin Sistem', id))
            .on('exit', () => {
                farelsukasamazahra.sendImage(from, './gbr/mager/magernulis1√.jpg', 'magernulis1.jpg', 'Neh Bwang/Mbwak\n\nBantu Support Kk\n\nSubscribe MFarelS CH\n\n© Powered By RajinNulis-BOT-WhatsApp', id)
            })
            break
        case '#menu': 
        case '/help':
        case '/menu': 
        case '#help':
                farelsukasamazahra.sendFile(from, './gbr/MFarelS.png', 'MFarelS.jpg', help, id)
            break
        case '/info': 
        case '#info':
            farelsukasamazahra.reply(from, info)
            break
        case '/syarat': 
        case '#syarat': 
            farelsukasamazahra.reply(from, syarat, id)
            break
        case '#donasi': 
        case '/donasi': 
        case '#donate': 
        case '/donate': 
            farelsukasamazahra.sendLinkWithAutoPreview(from, 'https://saweria.co/MFarelS', donate) 
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //farelsukasamazahra.kill().then(a => console.log(a))
    }
}
