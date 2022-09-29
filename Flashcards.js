import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';

function Flashcards({vocab, containerStyle, setActivity}) {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [side,setSide] = useState('term');
    const [running,setRunning] = useState(false);
    const [correctWords,setCorrectWords] = useState([]);
    const [incorrectWords,setIncorrectWords] = useState([]);
    useEffect(() => {
        vocab.sort((a,b) => 0.5-Math.random());

    },[]);
    const flipSide = () => {
        setSide(oldSide => oldSide == 'term'?'definition':'term');
    }
    const nextIndex = () => {
        if(currentIndex < Object.keys(vocab).length-1){
            setCurrentIndex(oldIndex => oldIndex+1);
            setSide('term');
        }
        else {
            setRunning(false);
        }
    }
    const guessedCorrect = (e) => {

        setCorrectWords(oldWords => [...oldWords, vocab[currentIndex] ]);
        nextIndex();
    }
    const guessedIncorrect = () => {
        setIncorrectWords(oldWords => [...oldWords, vocab[currentIndex]]);
        nextIndex();
    }
   return(
    <View style={containerStyle}>
        {running ? <View>

            <Pressable onPress={flipSide} hitSlop={200}>
                <Text>{vocab[currentIndex][side]}</Text>
            </Pressable>
            {side == 'definition' && (
                <View style={{marginTop:30}}>
                    <Button title="Got it!" onPress={guessedCorrect}/>
                    <Button title="Needs work." onPress={guessedIncorrect} />
                </View>
            )}
            <Button title="leave" onPress={() => setActivity('')} />
        </View> :
        <View>
            {incorrectWords.length == 0 && correctWords.length == 0 ?<Button title="start" onPress={() => setRunning(true)}/> : (
                <View>
                    <Text>Words that need work:</Text>
                    {incorrectWords.map(word => <Text key={word.term}>{word.term}</Text>)}
                    <Button title="Leave" onPress={() => setActivity('')}/>
                </View>  )}
        </View>}
    </View>
   ) 
}

export default Flashcards;