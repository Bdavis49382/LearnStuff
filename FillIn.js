import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
function FillIn({containerStyle, vocab, setActivity}) {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [enteredText,setEnteredText] = useState('');
    const [message,setMessage] = useState('Guess the term!');
    const [running,setRunning] = useState(false);

    useEffect(() => {
        vocab.sort((a,b) => 0.5-Math.random());

    },[]);
    const nextIndex = () => {
        setEnteredText('');
        setMessage('Guess the term!');
        if(currentIndex < Object.keys(vocab).length-1){
            setCurrentIndex(oldIndex => oldIndex+1);
        }
        else {
            setActivity('');
        }
    }
    const handleSubmit = () => {
        if(enteredText.toUpperCase() === vocab[currentIndex].term.trim().toUpperCase()) {
            setMessage('that is correct!');

        }
        else {
            setMessage("try again");
        }
    }
    return (
        <View style={containerStyle}>
            {running ? <View>
                <Text>{vocab[currentIndex]['definition']}</Text>
                <TextInput 
                    onChangeText={(text) => setEnteredText(text)}
                    value={enteredText}
                    onSubmitEditing={handleSubmit}
                    placeholder='Enter term'/> 

                {message !== 'that is correct!' && <Button title="submit" onPress={handleSubmit}/>}
                {message !== 'that is correct!' && <Button title="get a hint" onPress={() => setEnteredText(vocab[currentIndex].term.slice(0,2)) }/> }
                <Text>{message}</Text>
                {message === 'that is correct!' && <Button title="next word" onPress={nextIndex}/>}
                {message === 'try again' && <Button title="I was close enough" onPress={nextIndex}/>}
                <Button title="leave" onPress={() => setActivity('')} />
            </View> :
            <View>
                <Button title="start" onPress={() => setRunning(true)} />
            </View>}
        </View>
     );
}
export default FillIn;