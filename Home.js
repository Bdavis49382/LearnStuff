import { StyleSheet, Text, View, Button, findNodeHandle } from 'react-native';

function Home({styles, vocabSets, setVocabSet, setEditor}) {
    const {container, titleText, messageText} = styles;
    const changeVocabSet = (e) => {
        setVocabSet(e._dispatchInstances.memoizedProps.children[0].props.children)
    }
    return (
        <View style={container}>

                <Text style={titleText}>Welcome to LearnStuff!</Text>
                <Text style={messageText}>Please Select a Vocab Set</Text>
                <View style={{marginBottom:10}}>
                    {vocabSets.map(set => <Button key={set.id} title={set.name} onPress={changeVocabSet}/>)}
                </View>
                <Text>Or</Text>
                <Button color="green" title="Add new vocab set" onPress={() => setEditor('add')}/>
        </View>
    )
}
export default Home;