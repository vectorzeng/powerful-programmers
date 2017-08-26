/**
 * Created by vectorzeng on 17/8/24.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import CoderList from "../component/CoderList";
import {searchLoaded} from "../action/CodersAction";
import PropTypes from "prop-types";
import {LOADING_SATE} from "../reducers/codersReducer";
import CoderFetcher from "../fetcher/CoderFetcher";
import Typography from "material-ui/Typography";
import {URL_GIT_HUB} from "../util/GlobalEnv";

class SearchContainer extends Component {

    static propsTypes = {
        /**
         * searchValue 不可能为空的，如果他为空的，那么这个组件将不会存在
         */
        searchValue:PropTypes.string.nonEmpty,
    };

    constructor(props) {
        super(props);
        this.search(null, props.searchValue);
    }

    search = (currentValue, nextValue) => {
        if(currentValue !== nextValue){
            this.clearQueryListener();
            this.query = CoderFetcher.createSearchQuery(nextValue);
            this.query.setLoadListener(this.props.loaded);
            this.query.setLoadMoreListener(this.props.loadedMore);
            this.query.loadCoders();
        }
    };

    clearQueryListener = () => {
        if(this.query){
            this.query.clearListener();
        }
    };

    componentWillReceiveProps(nextProps){
        this.search(this.props.searchValue, nextProps.searchValue)
    }

    componentWillUnmount(){
        this.clearQueryListener();
    };

    render() {
        const {list, allCount,searchValue,showTipsNon} = this.props;
        return (
            <div>
                <CoderList
                    list={list}
                    allCount={allCount}/>
                <Typography style={{marginTop:"24%"}} type="headline" gutterBottom align="center">
                    没有找到：<span style={{color:"#B71C1C"}}>{searchValue}</span>。
                    <a href={URL_GIT_HUB}>添加{searchValue}到系统，成为作者</a>
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    list:state.listOfCoderBean,
    allCount:state.allCount,
    searchValue:state.searchValue,
    showTipsNon:state.showTipsNon,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    loaded (successed,list,count) {
        const loadingState = successed?
            LOADING_SATE.LOADING_SUCCESSED:
            LOADING_SATE.LOADING_FAILED;
        dispatch(searchLoaded(list, count, loadingState));
    },
    loadedMore(successed,list,count){

    }
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchContainer);