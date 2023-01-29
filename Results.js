import {Text, View, Button } from 'react-native';
export default function Results({containerStyle,correctWords,incorrectWords,navigation}) {
        return (
        <View style={containerStyle}>
            <Text>{correctWords.length} out of {correctWords.length+incorrectWords.length} attempted were correct</Text>
            <Text>Words that need work:</Text>
            {incorrectWords.length>0 ?incorrectWords.map(word => <Text key={word.term}>{word.term} / {word.definition}</Text>): <Text>None. Good job!</Text>}
            <Button title="Leave" onPress={() => navigation.navigate("Menu")}/>
        </View>)
}