import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
function FillIn({navigation,message, setMessage, currentIndex, containerStyle, vocab, guessedCorrect}) {
    const [enteredText,setEnteredText] = useState('');
    useEffect(() => {
        setEnteredText('');
        setMessage('Guess the term!');
    },[currentIndex])
    const handleSubmit = () => {
        if(enteredText.toUpperCase() === vocab[currentIndex].term.trim().toUpperCase()) {
            setMessage('that is correct!');

        }
        else {
            setMessage("try again");
        }
    }
    return (
        <View style={{ ...containerStyle, justifyContent:'space-evenly' }}>
            <View>
                <Text>{vocab[currentIndex]['definition']}</Text>
                <TextInput 
                    onChangeText={(text) => setEnteredText(text)}
                    value={enteredText}
                    onSubmitEditing={handleSubmit}
                    placeholder='Enter term'/> 

                {message !== 'that is correct!' && <Button title="submit" onPress={handleSubmit}/>}
                {message !== 'that is correct!' && <Button title="get a hint" onPress={() => setEnteredText(vocab[currentIndex].term.slice(0,2)) }/> }
                {message === 'try again' && <Button title="I give up" onPress={() => guessedCorrect(false,navigation)}/>}
                <Text>{message}</Text>
                {message === 'that is correct!' && <Button title="next word" onPress={() => guessedCorrect(true,navigation)}/>}
            </View> 
                <Button title="leave" onPress={() => navigation.navigate("Results")} color="red"/>
        </View>
     );
}
export default FillIn;