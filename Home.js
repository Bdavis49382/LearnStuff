import { StyleSheet, Text, View, Button, findNodeHandle } from 'react-native';

function Home({containerStyle, vocabSets, setVocabSet, setEditor}) {
    const changeVocabSet = (e) => {
        setVocabSet(e._dispatchInstances.memoizedProps.children[0].props.children)
    }
    return (
        <View style={containerStyle}>
            <Text>Welcome to LearnStuff!</Text>
            <Text>Please Select a Vocab Set</Text>
            {Object.keys(vocabSets).map(key => <Button key={key} title={key} onPress={changeVocabSet}/>)}
            <Button title="Add new vocab set" onPress={() => setEditor(true)}/>
        </View>
    )
}
export default Home;