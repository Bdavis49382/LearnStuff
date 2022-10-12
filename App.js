import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home';
import Menu from './Menu';
// import vocabSets from './vocabSets.json';
import GameScreen from './GameScreen';
import EditSets from './EditSets';
import { firebase } from './firebase';

export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');
  const [editor,setEditor] = useState('no');
  const setsRef = firebase.firestore().collection("vocabSets");
  const [vocabSets,setVocabSets] = useState([]);
  // useEffect(async () => {
  //   prom = await fetch('./vocabSets.json');
  //   data = prom.text();
  //   console.log(data);
  // },[])
  useEffect(() => {
        setsRef
        .onSnapshot(
            querySnapshot => {
                const vocabSets = [];
                querySnapshot.forEach((doc) => {
                    const {name, words} = doc.data()
                    vocabSets.push({
                        id: doc.id,
                        name,
                        words,
                    })
                })
                setVocabSets(vocabSets);
            }
        )
  }, []); 
   
  if(vocabSet === '' && editor == 'no') {
    return (
        <Home containerStyle={styles.container} setEditor={setEditor} vocabSets={vocabSets} setVocabSet={setVocabSet}/>
    );
  }
  else if(editor != 'no') {
    return <EditSets editor={editor} vocabSets={vocabSets} vocabSet={vocabSet} setEditor={setEditor} setVocabSet={setVocabSet} setsRef={setsRef} containerStyle={styles.container} />

  }
  else if(activity === '') {
    return <Menu setEditor={setEditor} containerStyle={styles.container} setVocabSet={setVocabSet} vocabSet={vocabSet} setActivity={setActivity}/>
  }
  else {
    return <GameScreen setActivity={setActivity} containerStyle={styles.container} vocab={vocabSets.filter((set) => set.name.toUpperCase() === vocabSet.toUpperCase())[0].words} activity={activity}/>
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
