/*
YouTube : MFarelS CH
https://www.youtube.com/channel/UCYfBSMa1JJbKwD8bNm-etiA

GitHub : MFarelS
https://github.com/MFarelS

Instagram : @mfarelsyahtiawan
https://instagram.com/mfarelsch

Saweria : MFarelS
https://sawwria.co/MFarelS

WhatsApp : 0812-1908-7237
https://wa.me/6281219087237
*/
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const { menu, donate, info } = require('./lib/cmd')
const { stdout } = require('process')

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = zahra = async (zahraaa, message) => {
    try {
        let { body, type, id, from, to, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList, author } = message
        if (sender && sender.isMe) from = to
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('#')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }

        const menulis = {
            magernulissatu: 'Harap Tunggu, Bot Sedang Menulis Di Buku 1!~',
            errormagernulissatu: 'Error, Terjadi Kesalahan Saat Menulis Di Buku 1!~'
            }
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await zahraaa.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await zahraaa.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('#')) console.log('\x1b[1;31m—\x1b[1;37m›', '\x1b{    Subscribe MFarelS CH    \x1b[1;37m}', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('#')) console.log('\x1b[1;31m—\x1b[1;37m›', '\x1b{    Subscribe MFarelS CH    \x1b[1;37m}', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        switch(command) {
        //MENU//
        case '/help':
        case '/menu':
        case '#help':
        case '#menu':
            zahraaa.reply(from, menu, id)
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //DONATE//
        case '/donate':
        case '/donasi':
        case '#donate':
        case '#donasi':
            zahraaa.sendLinkWithAutoPreview(from, donate, id)
            zahraaa.sendStickerfromUrl(from, 'https://i.ibb.co/KGncspR/Zahraaa.jpg', { method: 'get' })
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //INFO//
        case '/info':
        case '#info':
            zahraaa.reply(from, info, id)
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //MAGER NULIS//
        case '/magernulis1a':
            if (args.length === 1) return zahraaa.reply(from, 'Kirim Perintah */magernulis1a [text]*', id)
            const diTulis = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1b':
            if (args.length === 1) return zahraaa.reply(from, 'Kirim Perintah */magernulis1b [text]*', id)
            const diTulis2 = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat2 = diTulis2.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris2 = panjangKalimat2.split('\n').slice(0, 30).join('\n')
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-fill',
                '#001675',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris2,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1c':
            if (args.length === 1) return zahraaa.reply(from, 'Kirim Perintah */magernulis1c [text]*', id)
            const diTulis3 = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat3 = diTulis3.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris3 = panjangKalimat3.split('\n').slice(0, 30).join('\n')
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-fill',
                '#8c1a00',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris3,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1d':
            if (args.length === 1) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1d [teks]*', id)
            const diTulis4 = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat4 = diTulis4.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris4 = panjangKalimat4.split('\n').slice(0, 33).join('\n')
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const waktu = (day + ' ' + months[month] + ' ' + year)
            const hari = (thisDay)
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+78',
                hari,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '18',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+102',
                waktu,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris4,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1e':
            if (args.length === 1) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1e [teks]*', id)
            const diTulis5 = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat5 = diTulis5.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris5 = panjangKalimat5.split('\n').slice(0, 33).join('\n')
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const waktu2 = (day + ' ' + months[month] + ' ' + year)
            const hari2 = (thisDay)
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-fill',
                '#001675',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+78',
                hari2,
                '-fill',
                '#001675',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '18',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+102',
                waktu2,
                '-fill',
                '#001675',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris5,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1f':
            if (args.length === 1) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1f [teks]*', id)
            const diTulis6 = body.slice(14)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat6 = diTulis6.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris6 = panjangKalimat6.split('\n').slice(0, 33).join('\n')
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const waktu3 = (day + ' ' + months[month] + ' ' + year)
            const hari3 = (thisDay)
            spawn('convert', [
                './MFarelSZ/Farelll/magernulis1.jpg',
                '-fill',
                '#8c1a00',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+78',
                hari3,
                '-fill',
                '#8c1a00',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '18',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+102',
                waktu3,
                '-fill',
                '#8c1a00',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '1024x784',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris6,
                './MFarelSZ/Zahraaa/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
            .on('exit', () => {
                zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'MFarelSZ.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
            })
            break
        case '/magernulis1g':
                if (args.length === 4) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1g --[nama]--[kelas]--[teks]*', id)
                arg = body.trim().split('--')
                const diNama = arg[1]
                const diKelas = arg[2]
                const diTulis7 = arg[3]
                await zahraaa.reply(from, menulis.magernulissatu, id)
                const panjangKalimat7 = diTulis7.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama = diNama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas = diKelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris7 = panjangKalimat7.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama = panjangNama.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas = panjangKelas.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu4 = (day + ' ' + months[month] + ' ' + year)
                const hari4 = (thisDay)
                spawn('convert', [
                    './MFarelSZ/Farelll/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari4,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu4,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris7,
                    './MFarelSZ/Zahraaa/magernulis1√.jpg'
                ])
                .on('error', () => zahraaa.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'Jarot.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
                })
            break
        case '/magernulis1h':
                if (args.length === 4) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1h --[nama]--[kelas]--[teks]*', id)
                arg = body.trim().split('--')
                const diNama2 = arg[1]
                const diKelas2 = arg[2]
                const diTulis8 = arg[3]
                await zahraaa.reply(from, menulis.magernulissatu, id)
                const panjangKalimat8 = diTulis8.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama2 = diNama2.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas2 = diKelas2.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris8 = panjangKalimat8.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama2 = panjangNama2.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas2 = panjangKelas2.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu5 = (day + ' ' + months[month] + ' ' + year)
                const hari5 = (thisDay)
                spawn('convert', [
                    './MFarelSZ/Farelll/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#001675',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari5,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#001675',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu5,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#001675',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama2,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#001675',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas2, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#001675',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris8,
                    './MFarelSZ/Zahraaa/magernulis1√.jpg'
                ])
                .on('error', () => zahraaa.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'Jarot.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
                })
            break
        case '/magernulis1i':
                if (args.length === 4) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1i --[nama]--[kelas]--[teks]*', id)
                arg = body.trim().split('--')
                const diNama3 = arg[1]
                const diKelas3 = arg[2]
                const diTulis9 = arg[3]
                await zahraaa.reply(from, menulis.magernulissatu, id)
                const panjangKalimat9 = diTulis9.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama3 = diNama3.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas3 = diKelas3.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris9 = panjangKalimat9.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama3 = panjangNama3.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas3 = panjangKelas3.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu6 = (day + ' ' + months[month] + ' ' + year)
                const hari6 = (thisDay)
                spawn('convert', [
                    './MFarelSZ/Farelll/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari6,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu6,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama3,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas3, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris9,
                    './MFarelSZ/Zahraaa/magernulis1√.jpg'
                ])
                .on('error', () => zahraaa.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    zahraaa.sendImage(from, './MFarelSZ/Zahraaa/magernulis1√.jpg', 'Jarot.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
                })
            break
/*        case '/magernulis5
        case '#magernulis5:
                if (args.length === 4) return await zahraaa.reply(from, 'Kirim Perintah *\/magernulis1 --[nama]--[kelas]--[teks]*\n\n*Contoh :*\n/magernulis1 --MFarelS--7B--Subscribe MFarelS CH', id)
                arg = body.trim().split('--')
                const diNama = arg[1]
                const diKelas = arg[2]
                const diTulis = arg[3]
                await zahraaa.reply(from, menulis.magernulissatu, id)
                const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama = diNama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas = diKelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama = panjangNama.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas = panjangKelas.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu = (day + ' ' + months[month] + ' ' + year)
                const hari = (thisDay)
                spawn('convert', [
                    './mager/magernulis/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris,
                    './mager/magernulis√/magernulis1√.jpg'
                ])
                .on('error', () => zahraaa.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    zahraaa.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'Jarot.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
                })
            break*/
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        }
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
        //zahraaa.kill().then(a => console.log(a))
    }
}
