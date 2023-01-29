import { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import Home from './Home';
import Menu from './Menu';
import EditSets from './EditSets';
import Login from './Login';
import Flashcards from './Flashcards';
import Results from './Results';
import FillIn from './FillIn';
import Quiz from './Quiz';
import { firebase } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [vocabSet,setVocabSet] = useState('');
  const [activity,setActivity] = useState('');
  const [editor,setEditor] = useState('no');
  const [vocabSets,setVocabSets] = useState([]);
  const [user,setUser] = useState('');
  const setsRef = firebase.firestore().collection("vocabSets");
  const [message,setMessage] = useState('Guess the term!');
  const [currentIndex,setCurrentIndex] = useState(0);
  const [side,setSide] = useState('term');
  const [correctWords,setCorrectWords] = useState([]);
  const [incorrectWords,setIncorrectWords] = useState([]);
  const [vocab,setVocab] = useState([]);

  const Stack = createNativeStackNavigator();

  const flipSide = () => {
      setSide(oldSide => oldSide == 'term'?'definition':'term');
  }
  const nextIndex = (navigation) => {
      if(currentIndex < Object.keys(vocab).length-1){
          setCurrentIndex(oldIndex => oldIndex+1);
          setSide('term');
      }
      else {
          navigation.navigate("Results");
      }
  }
  const guessedCorrect = (correct,navigation) => {
      if (correct){
          setCorrectWords(oldWords => [...oldWords, vocab[currentIndex] ]);
          setMessage('that was correct!');
      }
      else {
          setIncorrectWords(oldWords => [...oldWords, vocab[currentIndex]]);
          setMessage('that was incorrect');
      }
      nextIndex(navigation);
  }
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
  useEffect(() => {
      vocab.sort((a,b) => 0.5-Math.random());
      setCorrectWords([]);
      setIncorrectWords([]);
      setCurrentIndex(0);
      setSide("term");
      setMessage("Guess the term!");
  },[activity]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
          name="Login" 
          options={{title:"Login"}}>
            {(props) => <Login {...props} styles={styles} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{title:"Home"}}>
            {(props) => 
            <Home 
              {...props}
              styles={styles} 
              setEditor={setEditor} 
              vocabSets={vocabSets} 
              setVocabSet={setVocabSet}
              setVocab={setVocab}
              user={user}
              setUser={setUser}
              />
            }
        </Stack.Screen>
        <Stack.Screen name="EditSets" options={{title:"Editor"}}>
          {(props) =>
          <EditSets 
            {...props}
            styles={styles}
            editor={editor} 
            vocabSets={vocabSets} 
            vocabSet={vocabSet} 
            setEditor={setEditor} 
            setVocabSet={setVocabSet} 
            setsRef={setsRef} 
            containerStyle={styles.container} 
            user={user}/>
          }
        </Stack.Screen>
        <Stack.Screen name="Menu" options={{title:"Menu"}}>
          {(props) => 
          <Menu 
            {...props}
            setCurrentIndex={setCurrentIndex}
            setEditor={setEditor} 
            containerStyle={styles.container} 
            vocabSets={vocabSets} 
            setsRef={setsRef} 
            setVocabSet={setVocabSet} 
            vocabSet={vocabSet} 
            setActivity={setActivity}/>
          }
        </Stack.Screen>
        <Stack.Screen name="Flashcards" options = {{title:"Flashcards"}}>
          {(props) => 
            <Flashcards 
              {...props}
              containerStyle={styles.container} 
              vocab={vocabSets.filter(
                (set) => set.name.toUpperCase() === vocabSet.toUpperCase())[0].words} 
              flipSide={flipSide} 
              currentIndex={currentIndex} 
              side={side} 
              guessedCorrect={guessedCorrect}/>
          }
        </Stack.Screen>
        <Stack.Screen name="Results" options = {{title:"Results"}}>
          {(props) => 
            <Results {...props} containerStyle={styles.container} correctWords={correctWords} incorrectWords={incorrectWords} />
          }
        </Stack.Screen>
        <Stack.Screen name="Fill in the blank" options = {{title:"Fill in the Blank"}}>
          {(props) => 
           <FillIn
              {...props}
              message={message} 
              setMessage={setMessage} 
              containerStyle={styles.container} 
              vocab={vocab} 
              guessedCorrect={guessedCorrect} 
              nextIndex={nextIndex} 
              currentIndex={currentIndex}/>

          }
        </Stack.Screen>
        <Stack.Screen name="Quiz" options = {{title:"Quiz"}}>
          {(props) => 
            <Quiz
              {...props}
              message={message} 
              containerStyle={styles.container} 
              setActivity={setActivity} 
              vocab={vocab} 
              guessedCorrect={guessedCorrect} 
              currentIndex={currentIndex}/>

          }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3B299',
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
