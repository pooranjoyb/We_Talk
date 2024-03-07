import React, { useEffect, useState } from 'react';
import { Offcanvas, Ripple, initTE } from 'tw-elements';
import { AiOutlineSend } from 'react-icons/ai';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        socket.emit('message', { text: messageText });
        console.log("Message sent sucess")
        setMessageText('');
    };

    useEffect(() => {
        initTE({ Offcanvas, Ripple });
    }, [messages]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        
    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages])

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    return (
        <>
            <div
                className="invisible fixed bottom-0 right-0 top-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                data-te-offcanvas-init
            >
                <div className="flex items-center justify-between p-4">
                    <h5 className="mb-0 font-semibold leading-normal" id="offcanvasRightLabel">
                        Chat Room
                    </h5>
                    <button
                        type="button"
                        className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-offcanvas-dismiss
                    >
                        <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                </div>

                <div className='h-4/5 text-start overflow-auto'>
                    {messages.map((msg, index) => (
                        <div className='border-2 my-4 px-3 bg-blue-600 text-white rounded-md w-64 mx-6' key={index}>{msg.text}</div>
                    ))}
                </div>

                <div className="fixed bottom-0 flex mx-8 gap-4 m-6">

                    <input
                        className="border-none text-black px-2 w-[18rem] rounded-md"
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <AiOutlineSend size={25}
                        onClick={sendMessage}
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;
