import { createAction, handleActions } from 'redux-actions'
// import uw_changed from "./datasets/uw_changed_human.json";
import uw_origin from "./datasets/uw_origin_human.json";
// import ic_origin from "./datasets/ic_origin_human.json";
// import ic_changed from "./datasets/ic_changed_human.json";

const dataset_lists = [uw_origin]

const ADD_IDX = 'chat/ADD_IDX' // 다음 대화로 이동
const SUB_IDX = 'chat/SUB_IDX' // 이전 대화로 이동
const PREV_STATUS = 'chat/PREV_STATUS' // 이전 대화로 이동
const NEXT_STATUS = 'chat/NEXT_STATUS' // 이전 대화로 이동
const CHANGE_DATASET = 'chat/CHANGE_DATASET'
const SET_RTYPE = 'chat/SET_RTYPE' // Response Type 설정

export const changePrev= createAction(PREV_STATUS)
export const changeNext= createAction(NEXT_STATUS)
export const addIdx= createAction(ADD_IDX)
export const subIdx= createAction(SUB_IDX)
export const changeDataset = createAction(CHANGE_DATASET, data_num => ({ data_num }))
export const setRtype = createAction(SET_RTYPE, object => ({ object }))

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
    r_type: Array(Object.keys(dataset_lists[0]).length).fill(new Array(5).fill(-10)),
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
            r_type: Array(Object.keys(dataset_lists[0]).length).fill(new Array(5).fill(-10)),
        }),
        [SET_RTYPE]: (state, action) => ({
            ...state,
            r_type: state.r_type.map(
                (arr, d_idx) => (d_idx === action.payload.object.d_idx) 
                    ?   arr.map(
                            (type, r_idx) => (r_idx === action.payload.object.r_idx)
                                ?   action.payload.object.type
                                :   type
                            )
                    :   arr
                )
        }),
    },
    initialState
)