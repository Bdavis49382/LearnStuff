import { StyleSheet, Text, View, Button } from 'react-native';

function Menu({setActivity, containerStyle, vocabSet, setVocabSet, setEditor}) {
    const changeActivity = (e) => {
        setActivity(e._dispatchInstances.memoizedProps.children[0].props.children);
    }
    return (
    <View style={containerStyle}>
        <Text>{vocabSet}</Text>
        <Text>Select Activity</Text>
        <Button title="Quiz" onPress={changeActivity}/>
        <Button title="flashcards" onPress={changeActivity}/>
        <Button title="fill in the blank" onPress={changeActivity}/>
        <Button title="edit vocab set" onPress={() => {
            setEditor('edit');
        }} />
        <Button title="Back to vocab sets" onPress={() => setVocabSet('')}/>
    </View>
    )
}
export default Menu;