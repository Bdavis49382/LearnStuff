import { StyleSheet, Text, View, Button, findNodeHandle } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
function Home({setLoggedIn, setUser, styles, vocabSets, setVocabSet, setEditor, user}) {
    const {container, titleText, messageText} = styles;
    const changeVocabSet = (e) => {
        setVocabSet(e._dispatchInstances.memoizedProps.children[0].props.children)
    }
    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
         setUser('');
         setLoggedIn(false);
        }).catch((error) => {
            alert(error);
        // An error happened.
        });

    };
    return (
        <View style={container}>
                <View>
                    <Button title="log out" onPress={logOut}/>
                </View>
                <Text style={titleText}>Welcome to LearnStuff {user}!</Text>
                <Text style={messageText}>Please Select a Vocab Set</Text>
                <View style={{marginBottom:10}}>
                    {vocabSets.map(vocabSet => vocabSet.user == user?<Button key={vocabSet.id} title={vocabSet.name} onPress={changeVocabSet}/>:'')}
                </View>
                <Text>Or</Text>
                <Button color="green" title="Add new vocab set" onPress={() => setEditor('add')}/>
        </View>
    )
}
export default Home;