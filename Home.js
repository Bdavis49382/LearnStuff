import { StyleSheet, Text, View, Button, findNodeHandle } from 'react-native';

function Home({containerStyle, vocabSets, setVocabSet, setEditor}) {
    const changeVocabSet = (e) => {
        setVocabSet(e._dispatchInstances.memoizedProps.children[0].props.children)
    }
    return (
        <View style={containerStyle}>
            <Text>Welcome to LearnStuff!</Text>
            <Text>Please Select a Vocab Set</Text>
            {vocabSets.map(set => <Button key={set.id} title={set.name} onPress={changeVocabSet}/>)}
            <Button title="Add new vocab set" onPress={() => setEditor('add')}/>
        </View>
    )
}
export default Home;