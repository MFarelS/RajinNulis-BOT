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

module.exports = msgHandler = async (farelzahra, message) => {
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

        const botnulis = {
            magernulissatu: 'Harap Tunggu, Bot Sedang Menulis Buku 1!~'
            }
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await farelzahra.getHostNumber()
        const blockNumber = await farelzahra.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await farelzahra.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const author = ["6281219087237@c.us"]
        const isAuthor = author.includes(sender.id)
        const uaOverride = 'Mager Nulis BOT WhatsApp'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('/')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('/')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isOwner) return
        switch(command) {
        case '.magernulis1': 
        case '-magernulis1': 
        case '!magernulis1': 
        case '#magernulis1': 
        case '/magernulis1':
            if (args.length === 1) return await farelzahra.reply(from, 'Kirim perintah /magernulis1 [teks]', id)
            const zahra = body.slice(12)
            await farelzahra.reply(from, botnulis.magernulissatu, id)
            const farel = zahra.replace(/(\S+\s*){1,10}/g, '$&\n')
            const zahrafarel = farel.split('\n').slice(0, 28).join('\n')
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const farelll = (day + ' ' + months[month] + ' ' + year)
            const zahraaa = (thisDay)
            spawn('convert', [
                './gbr/mager/magernulis1.jpg',
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '20',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+78',
                zahraaa,
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '18',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+102',
                farelll,
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                zahrafarel,
                './gbr/mager/magernulis1√.jpg'
            ])
            .on('error', () => farelzahra.reply(from, 'Error gan', id))
            .on('exit', () => {
                farelzahra.sendImage(from, './gbr/mager/magernulis1√.jpg', 'BotNulisMFarelS.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© Powered By Magernulis BOT✓*', id)
            })
            break
        case '#menu': 
        case '/help':
        case '/menu': 
        case '#help':
            farelzahra.reply(from, help, id)
            break
        case '/info': 
        case '#info':
            farelzahra.reply(from, info, id)
            break
        case '/syarat': 
        case '#syarat': 
            farelzahra.reply(from, syarat, id)
            break
        case '#donasi': 
        case '/donasi': 
        case '#donate': 
        case '/donate': 
            farelzahra.sendLinkWithAutoPreview(from, 'https://saweria.co/MFarelS', donate) 
        }
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
        //farelzahra.kill().then(a => console.log(a))
    }
}
