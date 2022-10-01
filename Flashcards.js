import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';

function Flashcards({vocab, setStage, containerStyle, setActivity,side, flipSide, currentIndex,guessedCorrect}) {
   return(
    <View style={containerStyle}>
        <View>

            <Pressable onPress={flipSide} hitSlop={200}>
                <Text>{vocab[currentIndex][side]}</Text>
            </Pressable>
            {side == 'definition' ? (
                <View style={{marginTop:30}}>
                    <Button title="Got it!" onPress={() => guessedCorrect(true)}/>
                    <Button title="Needs work." onPress={() => guessedCorrect(false)} />
                </View>
            ) : 
            <View>
               <Text>Tap anywhere to see definition</Text> 
            </View>}
            <Button title="leave" onPress={() => setStage(2)} />
        </View> 
    </View>
   ) 
}

export default Flashcards;