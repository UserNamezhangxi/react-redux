'use strict';
import * as CounterTypes from '../constants/CounterTypes';

export const incress = () => {
	return {type: CounterTypes.COUNT_INCRESS};
};

export const descress = () => {
	return {type: CounterTypes.COUNT_DECRESS};
};

export const reset = () => {
	return {type: CounterTypes.COUNT_RESET};
};

