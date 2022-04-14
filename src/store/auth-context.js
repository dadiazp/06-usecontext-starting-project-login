// Esto es un contexto. El mismo sirve para poder enviar datos mediante props entre componentes que no son padre e hijo.
// Es decir, sirve para evitar el tener que reenviar una propiedad desde un componente a otro hasta llegar al componente destino

import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = (email, password) => {
        console.log(email);
        console.log(password);
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
          value={
            {
              isLoggedIn: isLoggedIn,
              onLogout: logoutHandler,
              onLogin: loginHandler
            }
          }>{props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;