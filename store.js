import React from 'react';


export const UserContext = React.createContext(null)

export default ({children}) => {

	const [userID, setUserID] = React.useState("007")
    const [userName, setUserName] = React.useState("Sam")

	const store = {
        userID: [userID, setUserID],
        userName: [userName, setUserName]
	}

	return <UserContext.Provider value={store}>
		{children}
	</UserContext.Provider>
}
