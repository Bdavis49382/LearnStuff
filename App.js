import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home';
import Menu from './Menu';
import vocabSets from './vocabSets.json';
import GameScreen from './GameScreen';
import EditSets from './EditSets';

export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');
  const [editor,setEditor] = useState(false);

  // useEffect(async () => {
  //   prom = await fetch('./vocabSets.json');
  //   data = prom.text();
  //   console.log(data);
  // },[])
  
   
  if(vocabSet === '') {
    if(!editor) {
      return (
          <Home containerStyle={styles.container} setEditor={setEditor} vocabSets={vocabSets} setVocabSet={setVocabSet}/>
      );
    }
    return <EditSets containerStyle={styles.container} setEditor={setEditor}/>
  }
  else if(activity === '') {
    return <Menu containerStyle={styles.container} setVocabSet={setVocabSet} vocabSet={vocabSet} setActivity={setActivity}/>
  }
  else {
    return <GameScreen setActivity={setActivity} containerStyle={styles.container} vocab={vocabSets[vocabSet.toLowerCase()]} activity={activity}/>
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
