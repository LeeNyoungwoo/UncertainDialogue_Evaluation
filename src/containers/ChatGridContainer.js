import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIdx, } from '../store/modules/ChatData';
import ChatGrid from '../components/ChatGrid/ChatGrid';

export default function ChatGridContainer() {
    const dispatch = useDispatch();

    const data_idx = useSelector(state => state.chatdata.data_idx);

    const conv_addIdx = () => {
        dispatch(addIdx());
    }

    // const conv_chatAdd = (object) => {
    //     dispatch(chatAdd(object));
    // }

    return (
        <ChatGrid
            data_idx={data_idx}
            conv_addIdx={conv_addIdx}
        />
    );
}