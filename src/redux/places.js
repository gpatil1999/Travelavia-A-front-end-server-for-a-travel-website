import * as ActionTypes from './ActionTypes';

export const Places = (state = {isLoading:true,
								errMess:null,
								places:[]}, action) =>{

	switch(action.type){
		case ActionTypes.PLACES_LOADING :
			return {...state,isLoading:true,errMess:null,places:[]};

		case ActionTypes.ADD_PLACES :
			return {...state,isLoading:false,errMess:null,places:action.payload};

		case ActionTypes.ADD_PLACES :
			return {...state,isLoading:false,errMess:action.payload,places:[]};

		default:return state;
	};
};
