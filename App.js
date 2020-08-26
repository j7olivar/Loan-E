import React from 'react';
import LoginNavigator from './navigator/loginNavigator';
import { registerRootComponent } from 'expo';

export default function App() {
	return <LoginNavigator />;
}

registerRootComponent(App);