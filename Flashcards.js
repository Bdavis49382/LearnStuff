import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';

function Flashcards({vocab, containerStyle, setActivity}) {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [side,setSide] = useState('term');
    const flipSide = () => {
        setSide(oldSide => oldSide == 'term'?'definition':'term');
    }
    const nextIndex = () => {
        if(currentIndex < Object.keys(vocab).length-1){
            setCurrentIndex(oldIndex => oldIndex+1);
            setSide('term');
        }
        else {
            setActivity('');
        }
    }
   return(
    <View style={containerStyle}>
        <Pressable onPress={flipSide} hitSlop={200}>
            <Text>{vocab[currentIndex][side]}</Text>
        </Pressable>
        {side == 'definition' && (
        <View style={{marginTop:30}}>
            <Button title="Got it!" onPress={nextIndex}/>
            <Button title="Needs work." onPress={nextIndex} />
        </View>
    )}
    </View>
   ) 
}

export default Flashcards;