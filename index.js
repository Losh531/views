const puppeteer = require('puppeteer');
const colors = require('colors/safe');

(async () => {
        const args = ['--proxy-server=socks5://127.0.0.1:9050'];
        const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser', args });
        const page = await browser.newPage();
        await page.goto('https://check.torproject.org/');
        const isUsingTor = await page.$eval('body', el =>
                el.innerHTML.includes('Congratulations. This browser is configured to use Tor')
        );

        if (!isUsingTor) {
                console.log(colors.red.bold('Not using Tor. Closing...'));
                return await browser.close();
        }

        console.log(colors.green.bold('Using Tor. Continuing... '));

        // Now you can go wherever you want
        for (i = 0;i < 5000; i++){
            await page.goto('https://www.youtube.com/watch?v=cqgjLhtW9dI');
            console.log(i)
        }

        // You would add additional code to do stuff... 

        // Then when you're done, just close
        await browser.close();
})();
