import React, { useRef } from 'react'
import MessageListContainer from "../../containers/MessageListContainer"
import './ChatGrid.css';

export default function ChatGrid(props) {
    const messagesEnd = useRef(null)

    return (
        <div className="chatOuterBox">
            <div className="chatInnerBox">
                <main className="chatRoom">
                    <MessageListContainer />
                    <div style={{height:'2vh'}}></div>
                    <div ref={messagesEnd} />
                </main>
            </div>
        </div>
    );
}