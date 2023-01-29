import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button} from 'react-native';

function Flashcards({navigation,vocab, setStage, containerStyle, setActivity,side, flipSide, currentIndex,guessedCorrect}) {
   return(
    <View style={{ ...containerStyle,justifyContent:'space-evenly' }}>

            <Pressable onPress={flipSide} hitSlop={200} style={{alignItems:'center'}}>
                <Text>{vocab[currentIndex][side]}</Text>
            {side == 'definition' ? (
                <View style={{marginTop:30}}>
                    <Button title="Got it!" onPress={() => guessedCorrect(true,navigation)}/>
                    <Button title="Needs work." onPress={() => guessedCorrect(false,navigation)} />
                </View>
            ) : 
            <View>
               <Text style={{color:'gray'}}>Tap anywhere to see definition</Text> 
            </View>}
            </Pressable>
            <View>
                <Button title="leave" color='red' onPress={() => navigation.navigate("Results")} />
            </View>
    </View>
   ) 
}

export default Flashcards;