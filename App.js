import { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import Home from './Home';
import Menu from './Menu';
import GameScreen from './GameScreen';
import EditSets from './EditSets';
import Login from './Login';
import { firebase } from './firebase';

export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');
  const [editor,setEditor] = useState('no');
  const [vocabSets,setVocabSets] = useState([]);
  const [loggedIn,setLoggedIn] = useState(false);
  const [user,setUser] = useState('');
  const setsRef = firebase.firestore().collection("vocabSets");


  useEffect(() => {
        setsRef
        .onSnapshot(
            querySnapshot => {
                const vocabSets = [];
                querySnapshot.forEach((doc) => {
                    const {name, words, user} = doc.data()
                    vocabSets.push({
                        id: doc.id,
                        name,
                        words,
                        user
                    })
                })
                setVocabSets(vocabSets);
            }
        )
  }, [vocabSet]); 
  if(!loggedIn) {
    return <Login styles={styles} setLoggedIn={setLoggedIn} setUser={setUser}/>
  } 
  else if(vocabSet === '' && editor == 'no') {
    return (
        <Home 
          styles={styles} 
          setEditor={setEditor} 
          vocabSets={vocabSets} 
          setVocabSet={setVocabSet}
          user={user}
          setUser={setUser}
          setLoggedIn={setLoggedIn}/>

    );
  }
  else if(editor != 'no') {
    return (
      <EditSets 
        styles={styles}
        editor={editor} 
        vocabSets={vocabSets} 
        vocabSet={vocabSet} 
        setEditor={setEditor} 
        setVocabSet={setVocabSet} 
        setsRef={setsRef} 
        containerStyle={styles.container} 
        user={user}/>
    )
  }
  else if(activity === '') {
    return (
      <Menu 
      setEditor={setEditor} 
      containerStyle={styles.container} 
      vocabSets={vocabSets} 
      setsRef={setsRef} 
      setVocabSet={setVocabSet} 
      vocabSet={vocabSet} 
      setActivity={setActivity}/>
    )
  }
  else {
    return (
      <GameScreen 
      setActivity={setActivity} 
      containerStyle={styles.container} 
      vocab={vocabSets.filter(
        (set) => set.name.toUpperCase() === vocabSet.toUpperCase())[0].words} 
      activity={activity}/>
    )
  } 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3B298',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#54442B',
    margin: 50
  },
  messageText: {
    fontSize: 15,
    color: '#54442B',
    marginBottom: 20
  }
});
