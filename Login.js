import { useState } from 'react';
import { firebase } from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {View, TextInput, Text, Button} from 'react-native';
function Login({navigation,styles,setUser}) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username.trim(), password)
        .then((userCredential) => {
            // Signed in 
            setUser(userCredential.user.email);
            navigation.navigate('Home');

            // ...
        })
        .catch((error) => {
            alert(error);
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
        setPassword('');
        setUserName('');
    }
    const create = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, username.trim(), password)
        .then((userCredential) => {
            setUser(userCredential.user.email);
            navigation.navigate("Home");
        })
        .catch((error) => {
            alert(error);
        })
        setPassword('');
        setUserName('');
    }
    return (
        <View style={styles.container}>
                <Text>Enter Username</Text>
                <TextInput 
                    placeholder='Email'
                    onChangeText={(text) => setUserName(text)}
                    value= {username} 
                    onSubmitEditing={submit}
                    />
                <Text>Enter Password</Text>
                <TextInput 
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value= {password} 
                    secureTextEntry={true}
                    onSubmitEditing={submit}
                    />
                <Button title="Log in" onPress={submit}/>
                <Button title="Create New Account" onPress={create}/>
        </View>
        
    )
}
export default Login;