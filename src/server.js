const keypress = require('keypress');
const WebSocketServer = require('ws').WebSocketServer;

const wssConfig = { port: 9000 };
const wss = new WebSocketServer(wssConfig);

let lastConnection;

wss.on('connection', function connection(ws) {
    console.log('connected')

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    lastConnection = ws;
});

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit(0);
    }

    if (key.name == 'c') {
        lastConnection.send('close');
    }

    if (key.name == 'z') {
        lastConnection.send('shape');
    }

    if (key.name == 'x') {
        lastConnection.send('star');
    }

    if (key.name == 'b') {
        lastConnection.send('image-svg');
    }

    if (key.name == 'w') {
        lastConnection.send('resize-height-up');
    }

    if (key.name == 's') {
        lastConnection.send('resize-height-down');
    }

    if (key.name == 'a') {
        lastConnection.send('resize-width-down');
    }

    if (key.name == 'd') {
        lastConnection.send('resize-width-up');
    }

    if (key.name == 'e') {
        lastConnection.send('resize-scale-up');
    }

    if (key.name == 'q') {
        lastConnection.send('resize-scale-down');
    }

    if (key.name == 'i') {
        lastConnection.send('move-top');
    }

    if (key.name == 'k') {
        lastConnection.send('move-down');
    }

    if (key.name == 'j') {
        lastConnection.send('move-left');
    }

    if (key.name == 'l') {
        lastConnection.send('move-right');
    }

    if (key.name == 'u') {
        lastConnection.send('rotate-left');
    }

    if (key.name == 'o') {
        lastConnection.send('rotate-right');
    }

    if (key.name == 'r') {
        lastConnection.send('page-next');
    }

    if (key.name == 'f') {
        lastConnection.send('page-prev');
    }

    if (key.name == 't') {
        lastConnection.send('uppercase');
    }

    if (key.name == 'g') {
        lastConnection.send('lowercase');
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();