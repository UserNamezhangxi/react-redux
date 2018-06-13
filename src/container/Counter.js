import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import {incress, descress, reset} from './../actions/CounterAction';
import {connect} from 'react-redux'; // 引入connect函数
class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {count: 5}
	}


	_onPressReset() {
		this.props.dispatch(reset())
	}

	_onPressInc() {
		//为了测试性能，在这里触发一次循环+1000。
		for (let i = 0; i < 1000; i++) {
			this.props.dispatch(incress())
		}
	}

	_onPressDec() {
		this.props.dispatch(descress())
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.counter}>{this.props.counters.count}</Text>
				<TouchableOpacity style={styles.reset} onPress={() => this._onPressReset()}>
					<Text>归零</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.start} onPress={() => this._onPressInc()}>
					<Text>加1</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.stop} onPress={() => this._onPressDec()}>
					<Text>减1</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	counter: {
		fontSize: 50,
		marginBottom: 70
	},
	reset: {
		margin: 10,
		padding: 10,
		backgroundColor: 'yellow'
	},
	start: {
		margin: 10,
		padding: 10,
		backgroundColor: 'yellow'
	},
	stop: {
		margin: 10,
		padding: 10,
		backgroundColor: 'yellow'
	}
});

const mapStateToProps = state => ({
	counters: state.counter
});

export default connect(mapStateToProps)(Counter);