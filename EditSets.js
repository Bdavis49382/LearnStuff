import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import Word from './Word';

function EditSets({navigation,vocabSets, vocabSet, user, styles, setsRef, containerStyle, setEditor, editor}) {
    const {container, titleText, messageText} = styles;
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
        else if(words.length == 0) {
            setMessage("Your vocab set needs terms")

        }
        else if(words[0].definition == '') {
            setMessage("Your terms need definitions!")
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
            const data = {name,user,words}
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
            navigation.goBack();
        }

    }
    const changeWord = (index,newPart,part) => {
        setWords((oldWords) => {
            let outWords = [...oldWords];
            outWords[index] = {...oldWords[index], [part]: newPart};
            return outWords;

        })

    }
    const newTerm = () => {
        setWords(oldWords => [...oldWords,{term: '',definition: ''}]);
    }
    return (
        <View style={{...containerStyle}}>
            <View style={{...containerStyle,width:'90%',margin:20,backgroundColor: '#AC9572'}}>
                <TextInput placeholder='Enter Name' value={name} onChangeText={(text) => setName(text)}></TextInput>
                <ScrollView style={{padding:0,marginBottom:50,maxHeight:200,backgroundColor: '#AC9572'}}>
                    {words.map((word,index) => (
                        <Word key={index} newTerm={newTerm} index={index} word={word} changeWord={changeWord}/>
                    ))}
                </ScrollView>
            </View>
            <View style={{flexDirection:'row'}}>
                <Button title="Add a term" onPress={newTerm} />
                <Button title="Remove last term" onPress={() => setWords(oldWords => oldWords.slice(0,-1))} />
                <Button title="Submit" onPress={validate} />
            </View>
            <Text style={{color: 'red'}}>{message}</Text>
        </View>
    )

}
export default EditSets;