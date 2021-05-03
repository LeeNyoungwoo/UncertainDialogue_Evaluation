import React from 'react';
import { useSelector } from 'react-redux';
import MessageList from '../components/MessageList/MessageList';

export default function MessageListContainer() {
    const chatData = useSelector(state => state.chatdata.chatData);
    const data_idx = useSelector(state => state.chatdata.data_idx);
    const top1_mode = useSelector(state => state.chatdata.top1_mode);


    return (
        <MessageList
            data_idx={data_idx}
            chatData={chatData}
            top1_mode={top1_mode}
        />
    );
}