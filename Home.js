import { StyleSheet, Text, View, Button, findNodeHandle } from 'react-native';

function Home({containerStyle, vocabSets, setVocabSet}) {
    const changeVocabSet = (e) => {
        setVocabSet(e._dispatchInstances.memoizedProps.children[0].props.children)
    }
    return (
        <View style={containerStyle}>
            <Text>Welcome to LearnStuff!</Text>
            <Text>Please Select a Vocab Set</Text>
            {Object.keys(vocabSets).map(key => <Button key={key} title={key} onPress={changeVocabSet}/>)}
        </View>
    )
}
export default Home;