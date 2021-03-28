// const { Telegraf, Markup } = require('telegraf')
const { Composer } = require('micro-bot')
// const bot = new Telegraf('1746223285:AAGZWdOt-g-mTVeffK_nDh7TLWTZ1s2ZlAg')
const bot = new Composer

// Start Message \\
bot.start((ctx) => {
    ctx.reply('Dear customer,\nThis is a survey for showing how well you were satisfied by our service, please fill it up')
    ctx.telegram.sendMessage(ctx.chat.id, 'on a scale from 1 to 5, are you sarisfied by our tracking system?',
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Yes", callback_data:"Yes_tracking Service" }, {text: "No", callback_data:"No_tracking Service"}]
                ]
            }
        })
})

// user isn't satisfied by the tracking system \\
bot.action("No_tracking Service", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'What was your concern?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "go back to menu", callback_data:"go-back" }]
            ]
        }
    })
}))

// asking the user weather the location was accurate or not \\
bot.action("Yes_tracking Service", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Was your location accurate at the begining?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Yes", callback_data:"Yes_location" }, {text: "No", callback_data:"No_location"}]
            ]
        }
    })
}))

// user isn't satisfied by the location \\
bot.action("No_location", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Please send us your location to update it for future orders',
    {
    })
}))   

bot.on('location', (ctx) => {
    return ctx.reply('How was the physical status of the shipment?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Good, not damaged", callback_data:"safe shipment" }, {text: "bad, damaged!", callback_data:"damaged shipment"}]
            ]
        }
    })
})

// asking the user weather the shipment was safe or not \\
bot.action("Yes_location", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'How was the physical status of the shipment?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Good, not damaged", callback_data:"safe shipment" }, {text: "bad, damaged!", callback_data:"damaged shipment"}]
            ]
        }
    })
}))

// shipment is damaged
bot.action("damaged shipment", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Please send us a photo of the damaged parts',)
    {
}}))

bot.on(['photo', 'video'], (ctx) => {
    return ctx.reply('Are you satisfied with the price of shipping?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "fair price", callback_data:"fair price" }, {text: "price is high", callback_data:"price is high"}]
            ]
        }
    })
})

// asking the user weather the shipping price is reasonable or not \\
bot.action("safe shipment", (ctx => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Are you satisfied with the price of shipping?',
    {
        reply_markup: {
            inline_keyboard: [
                [{ text: "fair price", callback_data:"fair price" }, {text: "price is high", callback_data:"price is high"}]
            ]
        }
    })
}))

//asiohaoild

// bot.launch()
module.exports = bot

//Links and ID for heroku \\

//glacial-plateau-03595
//https://glacial-plateau-03595.herokuapp.com/
//