const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAuthenticated: false,
		},
		actions: {
			// Use getActions to call a function within a fuction
			loginState: () => {
				setStore({ isAuthenticated: true });
			},
			logoutState: () => {
				setStore({ isAuthenticated: false });
			},
		}
	};
};

export default getState;
