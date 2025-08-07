import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { createRequire } from 'module'; // Для других CommonJS-модулей
const require = createRequire(import.meta.url);
import dotenv from 'dotenv';
dotenv.config();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080,
    verifyClient: (info, callback) => {
        // Разрешаем все подключения (для разработки)
        callback(true);
    }
});
// replace the value below with the Telegram token you receive from @BotFather
let userAuthToken = null;
const token = process.env.TELEGRAMM_BOT
wss.on('connection', (ws) => {
    console.log('Новое подключение к WebSocket');
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'AUTH' && data.token) {
                // Сохраняем токен для этого клиента
               userAuthToken = data.token;
                console.log('Клиент авторизован с токеном:', data.token);
            }
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error);
        }
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

});

const API = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    config.headers.set('API-KEY', process.env.VITE_API_KEY);

    const token = userAuthToken||process.env.BOT_AUTH_TOKEN;
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
});
export const getTodoLists = async () => {
    const res = await API.get('/todo-lists');
    return res.data;
};

export const createTodoList = async (title) => {
    const res = await API.post('/todo-lists', { title });

    const message = {
        type:'TODO_ADDED',
                 todo:  res.data.data.item,
    };
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log('Sending:', message); // Логируем перед отправкой
            client.send(JSON.stringify(message));
        }
    });
    return res.data;
};



// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// Listen for any kind of message. There are different kinds of
// messages.
const userStates = new Map(); // Храним промежуточные состояния для создания

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}!
Вот, что я умею:
/todolists — показать списки
/newtodolist — создать список`);
});

bot.onText(/\/todolists/, async (msg) => {
    try {
        const lists = await getTodoLists();
        if (!lists.length) return bot.sendMessage(msg.chat.id, 'Пока нет списков.');
        const formatted = lists.map((l, i) => `${i + 1}. ${l.title}`).join('\n');
        bot.sendMessage(msg.chat.id, `Списки:\n${formatted}`);
    } catch (e) {
        console.error(e);
        bot.sendMessage(msg.chat.id, 'Ошибка при получении списка.');
    }
});

bot.onText(/\/newtodolist/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Введите название нового списка:');
    userStates.set(chatId, 'awaiting_todolist_title');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId);

    if (state === 'awaiting_todolist_title') {
        const title = msg.text;
        try {
           await createTodoList(title);

            bot.sendMessage(chatId, `Создан список: ${title}`);
        } catch (e) {
            bot.sendMessage(chatId, 'Ошибка при создании.');
        } finally {
            userStates.delete(chatId);
        }
    }
});
