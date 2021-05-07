import { createAction, handleActions } from 'redux-actions'
import uw_changed from "./datasets/uw_changed_human.json";
import uw_origin from "./datasets/uw_origin_human.json";
import ic_origin from "./datasets/ic_origin_human.json";
import ic_changed from "./datasets/ic_changed_human.json";

const dataset_lists = [uw_origin, uw_changed, ic_origin, ic_changed]

const ADD_IDX = 'chat/ADD_IDX' // 다음 대화로 이동
const SUB_IDX = 'chat/SUB_IDX' // 이전 대화로 이동
const PREV_STATUS = 'chat/PREV_STATUS' // 이전 대화로 이동
const NEXT_STATUS = 'chat/NEXT_STATUS' // 이전 대화로 이동
const CHANGE_DATASET = 'chat/CHANGE_DATASET'
const CHANGE_MODE = 'chat/CHANGE_MODE' // 모드 변경, Top1_mode - 0, Overall_mode - 1, Picture_only mode - 2
const SET_Q1 = 'chat/SET_Q1' // Questiong 1 rating 설정
const SET_Q2 = 'chat/SET_Q2' // Questiong 2 rating 설정

export const changePrev= createAction(PREV_STATUS)
export const changeNext= createAction(NEXT_STATUS)
export const addIdx= createAction(ADD_IDX)
export const subIdx= createAction(SUB_IDX)
export const changeDataset = createAction(CHANGE_DATASET, data_num => ({ data_num }))
export const setMode = createAction(CHANGE_MODE, mode => ({ mode }))
export const setQ1 = createAction(SET_Q1, object => ({ object }))
export const setQ2 = createAction(SET_Q2, object => ({ object }))

const initialState = {
    chatData: dataset_lists[0],
    chatData_length: Object.keys(dataset_lists[0]).length - 1,
    data_idx: 0,
    prev_status: false,
    next_status: true,
    stateOptions: [
        {
            key: 0,
            text: 'uw_origin',
            value: 0
        },
        {
            key: 1,
            text: 'uw_changed',
            value: 1
        },
        {
            key: 2,
            text: 'ic_origin',
            value: 2
        },
        {
            key: 3,
            text: 'ic_changed',
            value: 3
        },
    ],
    mode: 0,
    modeOptions: [
        {
            key: 0,
            text: 'Unknown Words',
            value: 0
        },
        {
            key: 2,
            text: 'Insufficient Context',
            value: 1
        }
    ],
    q1_rating: Array.from({length: Object.keys(dataset_lists[0]).length}, () => -1),
    q2_rating: Array.from({length: Object.keys(dataset_lists[0]).length}, () => -1),
}

export default handleActions(
    {
        [ADD_IDX]: (state) => ({
            ...state,
            data_idx: state.data_idx + 1
        }),
        [SUB_IDX]: (state) => ({
            ...state,
            data_idx: state.data_idx - 1
        }),
        [PREV_STATUS]: (state) => ({
            ...state,
            prev_status: !state.prev_status
        }),
        [NEXT_STATUS]: (state) => ({
            ...state,
            next_status: !state.next_status
        }),
        [CHANGE_DATASET]: (state, action) => ({
            ...state,
            chatData: dataset_lists[action.payload.data_num],
            chatData_length: Object.keys(dataset_lists[action.payload.data_num]).length - 1,
            data_idx: 0,
            prev_status: false,
            next_status: true,
            q1_rating: Array.from({length: Object.keys(dataset_lists[action.payload.data_num]).length}, () => -1),
            q2_rating: Array.from({length: Object.keys(dataset_lists[action.payload.data_num]).length}, () => -1),
        }),
        [CHANGE_MODE]: (state, action) => ({
            ...state,
            mode: action.payload.mode
        }),
        [SET_Q1]: (state, action) => ({
            ...state,
            q1_rating: state.q1_rating.map((el, idx) => (idx === action.payload.object.idx) ? action.payload.object.value : el)
        }),
        [SET_Q2]: (state, action) => ({
            ...state,
            q2_rating: state.q2_rating.map((el, idx) => (idx === action.payload.object.idx) ? action.payload.object.value : el)
        }),
    },
    initialState
)