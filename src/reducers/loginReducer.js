'use strict';
import * as loginType from '../constants/loginTypes';

const initialState = {
	status: '点击登陆',
	isSuccess: false,
	user: null
};

export default function login(state = initialState, action) {

	switch (action.type) {
		case loginType.LOGIN_IN_DONING:
			return {
				...state,
				status: '正在登陆',
				isSuccess: false,
				user: null
			}
			break;
		case loginType.LOGIN_IN_DONE:
			return {
				...state,
				status: '登陆成功',
				isSuccess: true,
				user: action.user
			}
			break;
		case loginType.LOGIN_IN_ERROR:
			return {
				...state,
				status: '登陆失败',
				isSuccess: false,
				user: null
			}
			break;
		default:
			return state;
			break;
	}


}