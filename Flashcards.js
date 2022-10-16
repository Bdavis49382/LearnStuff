import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';

function Flashcards({vocab, setStage, containerStyle, setActivity,side, flipSide, currentIndex,guessedCorrect}) {
   return(
    <View style={{ ...containerStyle,justifyContent:'space-evenly' }}>

            <Pressable onPress={flipSide} hitSlop={200} style={{alignItems:'center'}}>
                <Text>{vocab[currentIndex][side]}</Text>
            {side == 'definition' ? (
                <View style={{marginTop:30}}>
                    <Button title="Got it!" onPress={() => guessedCorrect(true)}/>
                    <Button title="Needs work." onPress={() => guessedCorrect(false)} />
                </View>
            ) : 
            <View>
               <Text style={{color:'gray'}}>Tap anywhere to see definition</Text> 
            </View>}
            </Pressable>
            <View>
                <Button title="leave" color='red' onPress={() => setStage(2)} />
            </View>
    </View>
   ) 
}

export default Flashcards;