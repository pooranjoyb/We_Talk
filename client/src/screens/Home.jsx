import React from "react";
import { Link } from "react-router-dom"

const Home = () => {

    return (
        <>
            <section className="bg-gray-900 flex flex-col text-white justify-center items-center">
                <div className="flex flex-col items-center justify-center h-screen">
                    <img className="w-[20rem]" src="./conference.gif" alt="Conference Gif" />
                    <div className="mx-auto max-w-3xl text-center">
                        <div
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent"
                        >
                            Welcome to We-Talk

                            <div className="py-6 text-xl"> Talk over the Air </div>
                        </div>

                        <p className="mx-auto  max-w-xl ">
                            We-Talk is a one-to-one Video Conferencing Application created using Socket.io, NodeJS, Mongo and WebRTC
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link to='/lobby'
                                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"

                            >
                                Try the Application
                            </Link>

                            <div
                                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            >
                                Learn More
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent pt-32"
                >
                    Integrated Real-Time Chatting

                    <div className="py-6 font-bold text-sm"> Now you can chat with your friend while in meet </div>
                </div>

                <section class="flex flex-col items-center justify-center h-[35rem] text-gray-800 pt-12">
                    <div class="flex flex-col flex-grow shadow-xl rounded-lg sm:w-[40rem] w-11/12">
                        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                            <div class="flex w-full mt-2 space-x-3 ">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                <div>
                                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                        <p class="text-sm"> Hi Bob! Can you hear me okay?</p>
                                    </div>
                                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                                </div>
                            </div>
                            <div class="flex w-full mt-2 space-x-3  ml-auto justify-end">
                                <div>
                                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                        <p class="text-sm">Hi Alice! Yes, I can hear you just fine. How about me? Is my audio clear?</p>
                                    </div>
                                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                                </div>
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            </div>

                            <div class="flex w-full mt-2 space-x-3 ">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                <div>
                                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                        <p class="text-sm"> Yes, your audio is clear too. How's your day going?</p>
                                    </div>
                                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                                </div>
                            </div>

                            <div class="flex w-full mt-2 space-x-3  ml-auto justify-end">
                                <div>
                                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                        <p class="text-sm">It's been busy, but good. How about you?</p>
                                    </div>
                                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                                </div>
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            </div>
                            <div class="flex w-full mt-2 space-x-3 ">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                <div>
                                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                        <p class="text-sm"> Same here. I've been working on that project we discussed earlier. </p>
                                    </div>
                                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
                        </div>
                    </div>
                </section>



                <footer>
                    <div class="max-w-2xl mx-auto text-white pt-20 pb-10">
                        <div class="text-center">
                            <h3 class="text-xl mb-3"> Probaly the Best One to One Conferencing App </h3>
                            <p> Stay fit. All day, every day. </p>
                        </div>
                        <div class="text-center w-full mt-12 text-sm text-gray-400">
                            <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Akshaya Mudireddy 2024 - BTech Major-Project</p>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
};

export default Home;