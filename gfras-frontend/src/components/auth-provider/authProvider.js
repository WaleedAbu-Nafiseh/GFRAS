import React, { useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constant';

export const AuthContext = React.createContext({
	isAuthenticated: false,
	errMessage: '',
	isLoading: false
});

export function AuthProvider({ children }) {
	const history = useHistory();
	const [userInfo, setUserInfo] = useState({});
	const [errMessage, setErrMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('token')
	);

	const setUserAuthentication = (email) => {
		setIsAuthenticated(true);
		localStorage.setItem('token', email);
		localStorage.setItem('userID', email);
		history.replace(ROUTES.QUIZZES);
	};

	const signIn = ({ email, password }) => {
		const db = firebase.firestore();
		const citiesRef = db.collection('Instructors');
		setIsLoading(true);
		setErrMessage('');
		citiesRef
			.where('email', '==', email)
			.where('password', '==', password)
			.get()
			.then((querySnapshot) => {
				if (querySnapshot.size > 0) {
					setUserAuthentication(email);
					localStorage.setItem('instructorID', querySnapshot.docs[0].id);
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setErrMessage('landingPage.signIn.incorrectEmailOrPassword');
				}
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	const signUp = ({ email, password }) => {
		setIsLoading(true);
		const db = firebase.firestore();

		db.collection('Instructors')
			.where('email', '==', email)
			.get()
			.then((res) => {
				if (res.size === 0) {
					setUserAuthentication(email);
					db.collection('Instructors').add({
						email,
						password
					});
					localStorage.setItem('instructorID', res.docs[0].id);
				} else {
					setErrMessage('landingPage.signUp.emailAlreadyInUse');
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				isLoading,
				errMessage,
				userInfo,
				signIn,
				signUp,
				setErrMessage
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
