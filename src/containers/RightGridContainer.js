import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIdx, subIdx, changePrev, changeNext, changeDataset, setRtype } from '../store/modules/ChatData';
import RightGrid from '../components/RightGrid/RightGrid';

export default function RightGridContainer() {
    const dispatch = useDispatch();

    const chatData = useSelector(state => state.chatdata.chatData);
    const data_idx = useSelector(state => state.chatdata.data_idx);

    const chatData_length = useSelector(state => state.chatdata.chatData_length);
    const prev_status = useSelector(state => state.chatdata.prev_status);
    const next_status = useSelector(state => state.chatdata.next_status);
    const stateOptions = useSelector(state => state.chatdata.stateOptions);
    const r_type = useSelector(state => state.chatdata.r_type);

    const conv_addIdx = () => {
        dispatch(addIdx());
    }

    const conv_subIdx = () => {
        dispatch(subIdx());
    }

    const conv_changePrev = () => {
        dispatch(changePrev());
    }

    const conv_changeNext = () => {
        dispatch(changeNext());
    }

    const conv_changeDataset = (data_num) => {
        dispatch(changeDataset(data_num));
    }

    const conv_setRtype = (object) => {
        dispatch(setRtype(object));
    }

    return (
        <RightGrid
            chatData={chatData}
            data_idx={data_idx}
    
            stateOptions={stateOptions}
            prev_status={prev_status}
            next_status={next_status}
            chatData_length={chatData_length}

            r_type={r_type}
            conv_setRtype={conv_setRtype}

            conv_addIdx={conv_addIdx}
            conv_subIdx={conv_subIdx}
            conv_changePrev={conv_changePrev}
            conv_changeNext={conv_changeNext}
            conv_changeDataset={conv_changeDataset}
        />
    );
}