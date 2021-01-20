const { create, farelll } = require('@open-wa/wa-automate')
const msgHandler = require('./zahra')
const options = require('./options')

const start = async (farelll = new farelll()) => {
        console.log('███╗░░░███╗███████╗░█████╗░██████╗░███████╗██╗░░░░░░██████╗░░░░░░██████╗░░█████╗░████████╗')
        console.log('████╗░████║██╔════╝██╔══██╗██╔══██╗██╔════╝██║░░░░░██╔════╝░░░░░░██╔══██╗██╔══██╗╚══██╔══╝')
        console.log('██╔████╔██║█████╗░░███████║██████╔╝█████╗░░██║░░░░░╚█████╗░█████╗██████╦╝██║░░██║░░░██║░░░')
        console.log('██║╚██╔╝██║██╔══╝░░██╔══██║██╔══██╗██╔══╝░░██║░░░░░░╚═══██╗╚════╝██╔══██╗██║░░██║░░░██║░░░')
        console.log('██║░╚═╝░██║██║░░░░░██║░░██║██║░░██║███████╗███████╗██████╔╝░░░░░░██████╦╝╚█████╔╝░░░██║░░░')
        console.log('╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚══════╝╚═════╝░░░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░')
        console.log(' ')
        console.log('██████╗░██╗░░░██╗  ███╗░░░███╗███████╗░█████╗░██████╗░███████╗██╗░░░░░░██████╗')
        console.log('██╔══██╗╚██╗░██╔╝  ████╗░████║██╔════╝██╔══██╗██╔══██╗██╔════╝██║░░░░░██╔════╝')
        console.log('██████╦╝░╚████╔╝░  ██╔████╔██║█████╗░░███████║██████╔╝█████╗░░██║░░░░░╚█████╗░')
        console.log('██╔══██╗░░╚██╔╝░░  ██║╚██╔╝██║██╔══╝░░██╔══██║██╔══██╗██╔══╝░░██║░░░░░░╚═══██╗')
        console.log('██████╦╝░░░██║░░░  ██║░╚═╝░██║██║░░░░░██║░░██║██║░░██║███████╗███████╗██████╔╝')
        console.log('╚═════╝░░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚══════╝╚═════╝░')
        console.log('')
        console.log('')
        console.log('')
        console.log('YouTube : MFareS CH')
        console.log('Instagram : @mfarelsyahtiawan')
        console.log('GitHub : https://github.com/MFarelS/MFarelS-BOT')
        console.log('Saweria : https://saweria.co/MFarelS')
        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log('███╗░░░███╗███████╗░█████╗░██████╗░███████╗██╗░░░░░░██████╗')
        console.log('████╗░████║██╔════╝██╔══██╗██╔══██╗██╔════╝██║░░░░░██╔════╝')
        console.log('██╔████╔██║█████╗░░███████║██████╔╝█████╗░░██║░░░░░╚█████╗░')
        console.log('██║╚██╔╝██║██╔══╝░░██╔══██║██╔══██╗██╔══╝░░██║░░░░░░╚═══██╗')
        console.log('██║░╚═╝░██║██║░░░░░██║░░██║██║░░██║███████╗███████╗██████╔╝')
        console.log('╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚══════╝╚═════╝░')
        console.log('BOT Sukses Di Aktifkan')
        // Force it to keep the current session
        farelll.onStateChanged((state) => {
            console.log('[ LOADING ]', state)
            if (state === 'BERMASALAH' || state === 'BELUM DIJALANKAN') farelll.forceRefocus()
        })
        // listening on message
        farelll.onAnyMessage((async (message) => {
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

        /*farelll.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) farelll.sendSeen(to)
        }))*/

    }

create('MFarelS', options(true, start))
    .then(farelll => start(farelll))
    .catch((error) => console.log(error))
