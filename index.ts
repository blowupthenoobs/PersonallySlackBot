import { App } from "@slack/bolt";

const app = new App({
    token: process.env.OAuth_TOKEN,
    appToken: process.env.App_TOKEN,
    socketMode: true,
});

app.command("/boom-bot-help", async({ command, ack, respond}) => {
    await ack();
    await respond({
        text:
        `Commands::
        /boom-bot-help: what you just did
        /light-the-fuse: check latency
        /defuser-paper-bomb: play a game >:)`
    })
})

app.command("/light-the-fuse", async({ command, ack, respond}) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({text: `went boom after ${latency}ms`});
})

app.command("/defuser-paper-bomb", async({ command, ack, respond}) => {
    const rand = getRandomIntNumber(0, 2);
    const playerMove = command.text;

    if(playerMove == "") {
        await respond({text: "make sure to add your move to the command"});
        return;
    }

    if(playerMove != "defuser" && playerMove != "paper" && playerMove != "bomb") {
        await respond({text: "That was not a valid move, please choose either defuser, paper, or bomb"});
        return;
    }

    if(playerMove == "defuser")
    {
        switch(rand)
        {
            case 0:
                await respond({text: "Both played defuser, you tied"});
                break;
            case 1:
                await respond({text: "Paper shorted the defuser, you lose"});
                break;
            case 2:
                await respond({text: "Defuser defused the bomb, you win"});
                break;
        }
    } else if(playerMove == "paper") {
        switch(rand)
        {
            case 0:
                await respond({text: "Paper shorted the defuser, you win"});
                break;
            case 1:
                await respond({text: "Both played paper, you tied"});
                break;
            case 2:
                await respond({text: "Bomb blew up the paper, you lose"});
                break;
        }
    } else if(playerMove == "bomb") {
        switch(rand)
        {
            case 0:
                await respond({text: "Defuser defused the bomb, you lose"});
                break;
            case 1:
                await respond({text: "Bomb blew up the paper, you win"});
                break;
            case 2:
                await respond({text: "both played bomb, both blow up. No winners"});
                break;
        }
    }
})

function getRandomIntNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// (async () => {
//   await app.start();
//   console.log("bot is running!");
// })();

await app.start(); //bun index.ts to start the project