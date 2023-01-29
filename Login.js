import { useState } from 'react';
import { firebase } from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {View, TextInput, Text, Button} from 'react-native';
function Login({navigation,styles,setLoggedIn,setUser}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
            // Signed in 
            setUser(userCredential.user.email);
            setLoggedIn(true);
            navigation.navigate('Home');

            // ...
        })
        .catch((error) => {
            alert(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        // firebase.auth().signInWithEmailAndPassword(userName,password)
        //     .then((response) => {
        //         const uid = response.user.uid;
        //         console.log(uid)
        //         const usersRef = firebase.firestore().collection('users');
        //         usersRef
        //             .doc(uid)
        //             .get()
        //             .then(firestoreDocument => {
        //                 if (!firestoreDocument.exists) {
        //                     alert("User does not exist.")
        //                     return;
        //                 }
        //                 const user = firestoreDocument.data()
        //                 setLoggedIn(true);
        //                 setUser(user);

        //             })
        //             .catch(error => {
        //                 alert(error)
        //             });
        //     })
        //     .catch(error => {
        //         alert(error)
        //     })
        setPassword('');
        setUserName('');
    }
    return (
        <View style={styles.container}>
                <Text>Enter Username</Text>
                <TextInput 
                    placeholder='Email'
                    onChangeText={(text) => setUserName(text)}
                    value= {userName} 
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
                <Button title="submit" onPress={submit}/>
        </View>
        
    )
}
export default Login;