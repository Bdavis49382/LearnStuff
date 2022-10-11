import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';

function EditSets({containerStyle, setEditor}) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [words, setWords] = useState([{term: '',definition: ''},{term: '',definition: ''},{term: '',definition: ''}]);

    const validate = () => {
        if(name.length == 0) {
            setMessage("A name is required for your vocab set!");
        }
        else if(words[0].definition == '') {
            setMessage("Your vocab set must have at least one defined term!")
        }
        else {
            setEditor(false);
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
        <View style={{...containerStyle,marginTop:100}}>
            <TextInput placeholder='Enter Name' onChangeText={(text) => setName(text)}></TextInput>
            <ScrollView>
                {words.map((word,index) => (
                    <View key={index}>
                        <TextInput placeholder="Enter term" value={word.term} onChangeText={(text) => changeWord(index,text,'term')}></TextInput>
                        <TextInput placeholder="Enter definition" onChangeText={(text) => changeWord(index,text,'definition')} value={word.definition}></TextInput>
                    </View>
                ))}
            </ScrollView>
            <Button title="Submit" onPress={validate} />
            <Text style={{color: 'red'}}>{message}</Text>
        </View>
    )

}
export default EditSets;