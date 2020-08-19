import React,{Fragment} from 'react';
import LoginNavigator from './navigator/loginNavigator';
import { UserContext } from './store';


export default function App() {
	/*
	<UserContext>
		return <LoginNavigator />
	</UserContext>;
	*/
	return (
		//<Fragment>
			//<UserContext>
			<LoginNavigator/>
			//</UserContext>
		//</Fragment>
	)
	
}
