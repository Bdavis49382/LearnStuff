import { StyleSheet, Text, View, Button } from 'react-native';

function Menu({setActivity, containerStyle}) {
    const changeActivity = (e) => {
        setActivity(e._dispatchInstances.memoizedProps.children[0].props.children);
    }
    return (
    <View style={containerStyle}>
        <Text>Select Activity</Text>
        <Button title="flashcards" onPress={changeActivity}/>
    </View>
    )
}
export default Menu;