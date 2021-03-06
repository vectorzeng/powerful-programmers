/**
 * Created by vectorzeng on 17/8/23.
 */

import {
    MAIN_LOADED, MAIN_LOAD, SEARCH, SEARCH_LOADED, OPEN_SNACK, UPDATE_LIKE_CODER,
    RELOAD
} from "../action/CodersAction";
export class LOADING_SATE {
    static NONE = -1;

    static LOADING = 1;
    static LOADING_FAILED = 2;
    static LOADING_SUCCESSED = 3;
    static LOADING_RELOAD = 4;

    static LOADING_MORE = 5;
    static LOADING_MORE_FAILED = 6;
    static LOADING_MORE_SUCCESSED = 7;
}


const initState = {
    listOfCoderBean: [],
    allCount:-1,
    loadingState: LOADING_SATE.NONE,
    searchValue:"",
    openSnack:false,
    snackMsg:"",
    showTipsNon:false,//当搜索结果为空时，提示用户到github项目上去添加
};

export default function codersReducer(state = initState, action) {

    switch (action.type){
        case SEARCH:
        case MAIN_LOAD:
            return{
                ...state,
                loadingState:action.loadingState,
                searchValue:action.searchValue,
                listOfCoderBean:[],
            };
        case SEARCH_LOADED:{
            const {listOfCoderBean,allCount,loadingState,showTipsNon} = action;
            return{
                ...state,
                listOfCoderBean,
                allCount,
                loadingState,
                showTipsNon,
            };
        }
        case MAIN_LOADED:{
            const {listOfCoderBean,allCount,loadingState} = action;
            return{
                ...state,
                listOfCoderBean,
                allCount,
                loadingState,
            };
        }
        case OPEN_SNACK:{
            const {openSnack,snackMsg} = action;
            return{
                ...state,
                openSnack,
                snackMsg,
            };
        }
        case UPDATE_LIKE_CODER:{
            const {listOfCoderBean} = action;
            return{
                ...state,
                listOfCoderBean
            };
        }
        case RELOAD:{
            const {loadingState} = action;
            return{
                ...state,
                loadingState
            };
        }
        default:
            return state;
    }
}