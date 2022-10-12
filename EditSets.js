import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';

function EditSets({vocabSets, vocabSet, setsRef, containerStyle, setEditor, editor}) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [words, setWords] = useState([]);

    useEffect(() => {
        if(editor == 'edit') {
            const oldVocabSet = vocabSets.filter((set) => set.name.toUpperCase() == vocabSet.toUpperCase())[0];
            setName(oldVocabSet.name);
            setWords(oldVocabSet.words);
        }
    },[])

    const validate = () => {
        if(name.length == 0) {
            setMessage("A name is required for your vocab set!");
        }
        else if(words[0].definition == '') {
            setMessage("Your vocab set must have at least one defined term!")
        }
        else {
            if(editor == 'edit') {

                const id = vocabSets.filter((set) => set.name.toUpperCase() == vocabSet.toUpperCase())[0].id;
                setsRef
                    .doc(id)
                    .delete()
                    .then(() => {
                    })
                    .catch(error => {
                    alert(error);
                    })

            }
            const data = {name,words}
            setsRef
            .add(data)
            .then(() => {
                setName('');
                setWords([]);
            })
            .catch(error => {
                alert(error);
            })

            setEditor('no');
        }

    }
    const changeWord = (index,newPart,part) => {
        setWords((oldWords) => {
            let outWords = [...oldWords];
            outWords[index] = {...oldWords[index], [part]: newPart};
            return outWords;

        })

    }
    return (
        <View style={{...containerStyle,marginTop:50}}>
            <TextInput placeholder='Enter Name' value={name} onChangeText={(text) => setName(text)}></TextInput>
            <ScrollView style={{padding:0,marginBottom:50,maxHeight:200}}>
                {words.map((word,index) => (
                    <View key={index}>
                        <TextInput placeholder="Enter term" value={word.term} onChangeText={(text) => changeWord(index,text,'term')}></TextInput>
                        <TextInput placeholder="Enter definition" onChangeText={(text) => changeWord(index,text,'definition')} value={word.definition}></TextInput>
                    </View>
                ))}
            </ScrollView>
            <Button title="Add a term" onPress={() => setWords(oldWords => [...oldWords,{term: '',definition: ''}])} />
            <Button title="Remove last term" onPress={() => setWords(oldWords => oldWords.slice(0,-1))} />
            <Button title="Submit" onPress={validate} />
            <Text style={{color: 'red'}}>{message}</Text>
            <Button title="Leave without saving" onPress={() => setEditor('no')} />
        </View>
    )

}
export default EditSets;