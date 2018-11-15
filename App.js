/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to OneSignal Project!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
			</View>
		);
	}

	constructor(properties) {
		super(properties);
		OneSignal.init("b752a483-3663-41ce-badf-5f23c7610870");
		console.log('it works');
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('ids', this.onIds);
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		console.log("Notification received: ", notification);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds(device) {
		console.log('Device info: ', device);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
