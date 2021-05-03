import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIdx, subIdx, changePrev, changeNext, changeDataset, setMode, setQ1, setQ2 } from '../store/modules/ChatData';
import RightGrid from '../components/RightGrid/RightGrid';

export default function RightGridContainer() {
    const dispatch = useDispatch();

    const data_idx = useSelector(state => state.chatdata.data_idx);
    const chatData_length = useSelector(state => state.chatdata.chatData_length);
    const prev_status = useSelector(state => state.chatdata.prev_status);
    const next_status = useSelector(state => state.chatdata.next_status);
    const stateOptions = useSelector(state => state.chatdata.stateOptions);
    const modeOptions = useSelector(state => state.chatdata.modeOptions);
    const purposeOptions = useSelector(state => state.chatdata.purposeOptions);
    const top1_mode = useSelector(state => state.chatdata.top1_mode);
    const q1_rating = useSelector(state => state.chatdata.q1_rating);
    const q2_rating = useSelector(state => state.chatdata.q2_rating);
    // const q3_rating = useSelector(state => state.chatdata.q3_rating);
    // const q4_rating = useSelector(state => state.chatdata.q4_rating);

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

    const conv_setMode = (mode) => {
        dispatch(setMode(mode));
    }

    const conv_setQ1 = (object) => {
        dispatch(setQ1(object));
    }

    const conv_setQ2 = (object) => {
        dispatch(setQ2(object));
    }

    // const conv_setQ3 = (object) => {
    //     dispatch(setQ3(object));
    // }
    
    // const conv_setQ4 = (object) => {
    //     dispatch(setQ4(object));
    // }

    return (
        <RightGrid
            data_idx={data_idx}
            stateOptions={stateOptions}
            prev_status={prev_status}
            next_status={next_status}
            chatData_length={chatData_length}
            modeOptions={modeOptions}
            purposeOptions={purposeOptions}

            top1_mode={top1_mode}
            q1_rating={q1_rating}
            q2_rating={q2_rating}
            // q3_rating={q3_rating}
            // q4_rating={q4_rating}

            conv_addIdx={conv_addIdx}
            conv_subIdx={conv_subIdx}
            conv_changePrev={conv_changePrev}
            conv_changeNext={conv_changeNext}
            conv_changeDataset={conv_changeDataset}
            conv_setMode={conv_setMode}

            conv_setQ1={conv_setQ1}
            conv_setQ2={conv_setQ2}
            // conv_setQ3={conv_setQ3}
            // conv_setQ4={conv_setQ4}
        />
    );
}