import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';
function Quiz({setStage, message, vocab, guessedCorrect, currentIndex, containerStyle}) {
    const [answers,setAnswers] = useState([]);
    useEffect(() => {
        makeAnswers()
    },[currentIndex])
    const makeAnswers = () => {
        const tempAnswers = [{word:vocab[currentIndex],correct:true}];
        let usedIndexes = [currentIndex];
        for (let i=0;i<3;i++) {
            let index = currentIndex;
            while(true) {
                index = Math.floor(Math.random()*vocab.length);
                if(!usedIndexes.includes(index)) {
                    break;
                }

            }
            usedIndexes.push(index);
            tempAnswers.push({word:vocab[index],correct:false})
        }
        tempAnswers.sort((a,b) => .5-Math.random());
        setAnswers(tempAnswers);
    }

    return (
        <View style={containerStyle}>

            <Text>{vocab[currentIndex].definition}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>

                {answers.map(
                    (answer) => 
                                (
                                <View style={{width:150}}>
                                    <Button 
                                        key={answer.word.term} 
                                        title={answer.word.term} 
                                        onPress={() => guessedCorrect(answer.correct)} />
                                </View> 
                                    ))}
            </View>
            <Text>{message}</Text>            
            <Button title="leave" onPress={() => setStage(2)} color='red'/>

        </View>
    )
}
export default Quiz;