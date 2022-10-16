import {Text, View, Button } from 'react-native';

function Menu({vocabSets, setsRef, setActivity, containerStyle, vocabSet, setVocabSet, setEditor}) {
    const changeActivity = (e) => {
        setActivity(e._dispatchInstances.memoizedProps.children[0].props.children);
    }
    const deleteSet = () => {
        const id = vocabSets.filter((set) => set.name.toUpperCase() == vocabSet.toUpperCase())[0].id;
        setsRef
            .doc(id)
            .delete()
            .then(() => {
            })
            .catch(error => {
            alert(error);
            });
        setVocabSet(''); 
    }
    return (
    <View style={containerStyle}>
        <Text>{vocabSet}</Text>
        <Text>Select Activity</Text>
        <View style={{marginTop:10,marginBottom:10}}>

        <Button title="Quiz" onPress={changeActivity}/>
        <Button title="flashcards" onPress={changeActivity}/>
        <Button title="fill in the blank" onPress={changeActivity}/>
        </View>
        <View style={{marginTop:10,marginBottom:60}}>
            <Button title="edit vocab set" color={'orange'} onPress={() => {
                setEditor('edit');
            }} />
            <Button title="Delete Vocab Set" color={'red'} onPress={deleteSet} />
        </View>
        <Button title="Back to vocab sets" onPress={() => setVocabSet('')}/>
    </View>
    )
}
export default Menu;