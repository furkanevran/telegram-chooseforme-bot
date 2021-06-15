const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("TOKEN: " + token);

const bot = new TelegramBot(token, { polling: true });

const getMessage = (text) => {
    try {
        const options = text
            .trim()
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x !== undefined && x.length > 0);

        if (options.length === 1) {
            return [null, null];
        }

        const chosen = options[Math.floor(Math.random() * options.length)];

        return [chosen, null];
    } catch (e) {
        return [null, e];
    }
};

bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (msg.text !== null && msg.text.length > 0) {
        try {
            const [chosen, err] = getMessage(msg.text);

            if (chosen !== null) {
                bot.sendMessage(chatId, chosen);
            }
        } catch (e) {
            console.error(e);
        }
    }
});

bot.on("inline_query", (query) => {
    let data = query.query;
    if (data !== null && data.length > 0) {
        try {
            const [chosen, err] = getMessage(data);

            if (chosen !== null) {
                bot.answerInlineQuery(
                    query.id,
                    [
                        {
                            id: "0",
                            type: "article",
                            title: "I have chosen!",
                            description: "Click here to get your answer.",
                            message_text: `${chosen}\nOptions: ${data}`,
                        },
                    ],
                    {
                        cache_time: 0,
                    }
                );
            }
        } catch (e) {
            console.error(e);
        }
    }
});
