const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) => console.log(ctx.message));
bot.start((ctx) => ctx.reply(`Heil ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Unbekannte'}!`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b> Hinrichtungen </b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Henker', 'btn_1'), Markup.button.callback('Folterinstrument', 'btn_2'), Markup.button.callback('Ort der Folter', 'btn_3')],
                [Markup.button.callback('Denunziation', 'btn_4')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }
   
})


function addActionBot (name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }

            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
    
        } catch(e) {
            console.error(e)
        }
    })
}

addActionBot('btn_1', 'img/Buchenwald.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)


bot.launch();
 
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
// const { Telegraf } = require('telegraf');

// const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('hipster', Telegraf.reply('λ'));
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));