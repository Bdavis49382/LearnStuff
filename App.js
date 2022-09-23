import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home';
import Menu from './Menu';
import Flashcards from './Flashcards';

const vocabSets = {
  anatomy:[
    {
      term:"mV",
      definition:"milliVolt"
    },
    {
      term:"OH-",
      definition:"hydroxide"
    },
    {
      term:"ab-",
      definition:"away from"
    }
  ]
}
export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');
  
  if(vocabSet === '') {
    return (
        <Home containerStyle={styles.container} vocabSets={vocabSets} setVocabSet={setVocabSet}/>
    );
  }
  else if(activity === '') {
    return <Menu containerStyle={styles.container} setActivity={setActivity}/>
  }
  else if(activity === 'flashcards'.toUpperCase()) {
    return <Flashcards setActivity={setActivity} containerStyle={styles.container} vocab={vocabSets[vocabSet.toLowerCase()]}/>
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
