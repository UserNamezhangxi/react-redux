import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法


class LoginPage extends Component {

	render() {
		const {login} = this.props;
		return (
			<View style={styles.container}>
				<Text>状态: {this.props.status}
				</Text>
				<TouchableOpacity onPress={() => login()} style={{marginTop: 50}}>
					<View style={styles.loginBtn}>
						<Text>登录
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5FCFF'
	},
	loginBtn: {
		borderWidth: 1,
		padding: 5,
	}
});

export default connect(
	(state) => ({
		status: state.login.status,
		isSuccess: state.login.isSuccess,
		user: state.login.user,
	}),
	(dispatch) => ({
		login: () => dispatch(loginAction.handleLogin()),
	})
)(LoginPage)
