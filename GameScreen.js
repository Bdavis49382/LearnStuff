import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';
import Flashcards from './Flashcards';
import FillIn from './FillIn';
import Quiz from './Quiz';

function GameScreen({vocab, containerStyle, activity, setActivity}) {
    const [message,setMessage] = useState('Guess the term!');
    const [currentIndex,setCurrentIndex] = useState(0);
    const [side,setSide] = useState('term');
    const [stage,setStage] = useState(0);
    const [correctWords,setCorrectWords] = useState([]);
    const [incorrectWords,setIncorrectWords] = useState([]);

    useEffect(() => {
        vocab.sort((a,b) => 0.5-Math.random());
        setCorrectWords([]);
        setIncorrectWords([]);
    },[activity]);
    const flipSide = () => {
        setSide(oldSide => oldSide == 'term'?'definition':'term');
    }
    const nextIndex = () => {
        if(currentIndex < Object.keys(vocab).length-1){
            setCurrentIndex(oldIndex => oldIndex+1);
            setSide('term');
        }
        else {
            setStage(2);
        }
    }
    const guessedCorrect = (correct) => {
        if (correct){
            setCorrectWords(oldWords => [...oldWords, vocab[currentIndex] ]);
            setMessage('that was correct!');
        }
        else {
            setIncorrectWords(oldWords => [...oldWords, vocab[currentIndex]]);
            setMessage('that was incorrect');
        }
        nextIndex();
    }
    if(stage === 0) {
        return (
            <View style={containerStyle}>
                <Button title="start" onPress={() => {
                    setStage(1);}}/>
            </View>
        )
    }
    else if(stage === 1) {
        switch(activity) {
            case('Flashcards'.toUpperCase()):
                return <Flashcards 
                        setStage={setStage} 
                        containerStyle={containerStyle} 
                        vocab={vocab} 
                        flipSide={flipSide} 
                        currentIndex={currentIndex} 
                        side={side} 
                        guessedCorrect={guessedCorrect}/>;
            case('Fill In the blank'.toUpperCase()):
                return <FillIn
                        message={message} 
                        setMessage={setMessage} 
                        setStage={setStage} 
                        containerStyle={containerStyle} 
                        vocab={vocab} 
                        guessedCorrect={guessedCorrect} 
                        nextIndex={nextIndex} 
                        currentIndex={currentIndex}/>
            case('Quiz'.toUpperCase()):
                return <Quiz
                        message={message} 
                        containerStyle={containerStyle} 
                        setStage={setStage} 
                        setActivity={setActivity} 
                        vocab={vocab} 
                        guessedCorrect={guessedCorrect} 
                        currentIndex={currentIndex}/>
        }
    }
    else if(stage === 2) {
        return (
        <View style={containerStyle}>
            <Text>{correctWords.length} out of {correctWords.length+incorrectWords.length} attempted were correct</Text>
            <Text>Words that need work:</Text>
            {incorrectWords.length>0 ?incorrectWords.map(word => <Text key={word.term}>{word.term} / {word.definition}</Text>): <Text>None. Good job!</Text>}
            <Button title="Leave" onPress={() => setActivity('')}/>
        </View>)
    }
}
export default GameScreen;