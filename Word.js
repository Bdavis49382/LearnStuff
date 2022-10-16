import {View, TextInput, Text} from 'react-native';
function Word({newTerm, index, word, changeWord}) {
    return (
        <View styles={
            {flex: 1, 
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            width:100}}>
            <TextInput 
                style={{width:200}}
                maxLength={40} 
                placeholder="Enter term"
                value={word.term} 
                onChangeText={(text) => changeWord(index,text,'term')}
                 />
            <TextInput 
                style={{width:200}}
                maxLength={40} 
                placeholder="Enter definition" 
                onChangeText={(text) => changeWord(index,text,'definition')} 
                value={word.definition}
                onSubmitEditing={newTerm}
                />
        </View>
        
    )
}
export default Word;