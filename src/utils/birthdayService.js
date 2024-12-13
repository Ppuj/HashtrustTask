import axios from 'axios';
import { GetLocalStorageData } from './LocalStorageUtils';

const sendBirthdayMessage = (name) => {
    const webhookUrl = "https://discord.com/api/webhooks/1316669480914522162/m6uOcBRLBzozBWRVEvkWnKtgXoux4uTQ6QNb2NwzBZDwzNoNJ90aJt85m3h43KU7T6cY";  //discord url
    const message = {
        content: `🎉 Happy Birthday to ${name}! 🎂`,
    };

    axios.post(webhookUrl, message)
        .then(response => {
            console.log('Birthday message sent successfully:', JSON.parse(response.config.data).content);
        })
        .catch(error => {
            console.error('Error sending birthday message:', error);
        });
};


const checkBirthdays = () => {
    const users = GetLocalStorageData();
    if (users && users.length > 0) {
        const today = new Date(); // Get today's date in YYYY-MM-DD format
        const todayMonth = today.getMonth();  // Get current month (0-11)
        const todayDay = today.getDate();
        users.forEach(user => {
            const birthday = new Date(user.birthday); // Convert user's birthday string to Date object
            const birthdayMonth = birthday.getMonth();
            const birthdayDay = birthday.getDate();
            if (birthdayMonth === todayMonth && birthdayDay === todayDay) {
                sendBirthdayMessage(user.name);
            }
        });
    }
};

const startBirthdayService = () => {
    setInterval(checkBirthdays, 30000);
};

export default startBirthdayService;
