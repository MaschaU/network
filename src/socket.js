import * as io from "socket.io-client";
export let socket;

export const init = () => {
    socket = io.connect();

    /*
    socket.on(
        'chatMessages',
        msgs => store.dispatch(
            chatMessages(msgs)
        )
    );*/

    socket.on('chatMessage',
        message => { alert(message);});

};

