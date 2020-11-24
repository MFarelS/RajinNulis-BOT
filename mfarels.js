const { create, farelll } = require('@open-wa/wa-automate')
const zahra = require('./zahra')
const magernulis = require('./magernulis')

const start = async (farelll = new farelll()) => {
        console.log('[ MEMBACA SCRIPT NULIS ]')
        console.log('Subscribe MFare] CH')
        console.log('Mager Nulis 1 OK')
        console.log('BOT Nulis Sukses Di Aktifkan')
        // Force it to keep the current session
        farelll.onStateChanged((state) => {
            console.log('[ LOADING ]', state)
            if (state === 'BERMASALAH' || state === 'BELUM DIJALANKAN') farelll.forceRefocus()
        })
        // listening on message
        farelll.onMessage((async (message) => {
            farelll.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    farelll.cutMsgCache()
                }
            })
           zahra(farelll, message)
        }))

        farelll.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(farelll, heuh)
            //left(farelll, heuh)
            }))
        
        farelll.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 10) { 
            	farelll.sendText(chat.id, `Minim Invite BOT Nulis Ke Group = 10 Member`).then(() => farelll.leaveGroup(chat.id)).then(() => farelll.deleteChat(chat.id))
            } else {
                farelll.sendText(chat.groupMetadata.id, `Hai Member Group *${chat.contact.name}* \nPerkenalkan, Saya Adalah BOT WhatsApp Yang Dapat Menulis Di Buku\nKirim Perintah *#menu* Untuk Melihat Menu`)
            }
        }))

        /*farelll.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) farelll.sendSeen(to)
        }))*/

    }

create('MFarelS', magernulis(true, start))
    .then(farelll => start(farelll))
    .catch((error) => console.log(error))
