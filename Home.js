import { StyleSheet, Text, View, Button} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
function Home({navigation,setVocab, setUser, styles, vocabSets, setVocabSet, setEditor, user}) {
    const {container, titleText, messageText} = styles;
    const changeVocabSet = (selected) => {
        // const selected =e._dispatchInstances.memoizedProps.children[0].props.children; 
        setVocabSet(selected)
        setVocab(vocabSets.filter(
            (set) => set.name.toUpperCase() === selected.toUpperCase())[0].words);
        navigation.navigate("Menu")
    }
    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
         setUser('');
         navigation.navigate("Login")
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
                    {vocabSets.map((vocabSet) => vocabSet.user == user?<Button key={vocabSet.id} title={vocabSet.name} onPress={() => changeVocabSet(vocabSet.name)}/>:'')}
                </View>
                <Text>Or</Text>
                <Button color="green" title="Add new vocab set" onPress={() => {
                    setEditor('add')
                    navigation.navigate('EditSets')
                }}/>
        </View>
    )
}
export default Home;