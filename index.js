const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("TOKEN: " + token);

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (msg.text !== null && msg.text.length > 0) {
        try {
            const options = data
                .trim()
                .split(",")
                .map((x) => x.trim())
                .filter((x) => x !== undefined && x.length > 0);
            const chosen = options[Math.floor(Math.random() * options.length)];

            bot.sendMessage(chatId, chosen);
        } catch (e) {
            console.error(e);
        }
    }
});

bot.on("inline_query", (query) => {
    let data = query.query;
    if (data !== null && data.length > 0) {
        try {
            const options = data
                .trim()
                .split(",")
                .map((x) => x.trim())
                .filter((x) => x !== undefined && x.length > 0);
            const chosen = options[Math.floor(Math.random() * options.length)];

            bot.answerInlineQuery(
                query.id,
                [
                    {
                        id: "0",
                        type: "article",
                        title: "I have chosen!",
                        description: "Click this to get your answer.",
                        message_text: chosen,
                    },
                ],
                {
                    cache_time: 0,
                }
            );
        } catch (e) {
            console.error(e);
        }
    }
});
