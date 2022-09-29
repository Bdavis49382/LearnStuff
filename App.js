import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home';
import Menu from './Menu';
import Flashcards from './Flashcards';
import vocabSets from './vocabSets.json';
import FillIn from './FillIn';

export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');

  // useEffect(async () => {
  //   prom = await fetch('./vocabSets.json');
  //   data = prom.text();
  //   console.log(data);
  // },[])
  
   
  if(vocabSet === '') {
    return (
        <Home containerStyle={styles.container} vocabSets={vocabSets} setVocabSet={setVocabSet}/>
    );
  }
  else if(activity === '') {
    return <Menu containerStyle={styles.container} setVocabSet={setVocabSet} vocabSet={vocabSet} setActivity={setActivity}/>
  }
  else if(activity === 'flashcards'.toUpperCase()) {
    return <Flashcards setActivity={setActivity} containerStyle={styles.container} vocab={vocabSets[vocabSet.toLowerCase()]}/>
  }
  else if(activity === 'fill in the blank'.toUpperCase()) {
    return <FillIn setActivity={setActivity} containerStyle={styles.container} vocab={vocabSets[vocabSet.toLowerCase()]}/>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
