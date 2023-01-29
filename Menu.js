import {Text, View, Button } from 'react-native';

function Menu({navigation,vocabSets, setsRef, setActivity, containerStyle, vocabSet, setVocabSet, setEditor}) {
    const changeActivity = (selected) => {
        setActivity(selected);
        navigation.navigate(selected)
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
        navigation.navigate("Home");
    }
    return (
    <View style={containerStyle}>
        <Text>{vocabSet}</Text>
        <Text>Select Activity</Text>
        <View style={{marginTop:10,marginBottom:10}}>

        <Button title="Quiz" onPress={() => changeActivity("Quiz")}/>
        <Button title="flashcards" onPress={() => changeActivity("Flashcards")}/>
        <Button title="fill in the blank" onPress={() => changeActivity("Fill in the blank")}/>
        </View>
        <View style={{marginTop:10,marginBottom:60}}>
            <Button title="edit vocab set" color={'orange'} onPress={() => {
                setEditor('edit');
                navigation.navigate("EditSets")
            }} />
            <Button title="Delete Vocab Set" color={'red'} onPress={deleteSet} />
        </View>
    </View>
    )
}
export default Menu;