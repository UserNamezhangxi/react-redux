'use strict';
import * as CouterTypes from '../constants/CounterTypes';

const defaultState = {
	count: 5,
	factor: 1,
};

export default function counter(state = defaultState, action) {

	switch (action.type) {
		case CouterTypes.COUNT_INCRESS:
			return {
				...state,
				count: state.count + state.factor,

			}
			break;
		case CouterTypes.COUNT_DECRESS:
			return {
				...state,
				count: state.count - state.factor,
			}
			break;
		case CouterTypes.COUNT_RESET:
			return {
				...state,
				count: 0,
			}
			break;
		default:
			return {
				...state
			}
	}
}

