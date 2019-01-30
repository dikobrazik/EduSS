import React from 'react';
import {
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Image,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Icon} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language:'',
      date:this._currentDate(),
      group:'',
    };
  }
  
  static navigationOptions = {
    title: 'Header',
    headerStyle: {
      backgroundColor: '#6C6656cf'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  _currentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if(month<10) return date+'.0'+month+'.'+year;
    else return date+'.'+month+'.'+year;
  }
  returnData(group) {
    this.setState({group: group});
  }
  componentDidMount() {
    if(this.state.group) {}

  }
  _chooseData = async() =>{
    if(Platform.OS === 'ios'){
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      </View>
    }else{
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
        }
        if (action == DatePickerAndroid.dateSetAction){
          if(month<9) this.setState({date:day+'.0'+(month+1)+'.'+year})
          else this.setState({date:day+'.'+(month+1)+'.'+year})
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    const groupChooseIcon = <Icon size={30} underlayColor='#6C665677' name='torsos-all' type='foundation'
                onPress={()=>{navigate('Picker', {returnData:this.returnData.bind(this)})}}/>;
    const groupNumber = 
      <Text style={{fontSize:16}} onPress={()=>{
        navigate('Picker', {returnData:this.returnData.bind(this)})}
      }>
        {this.state.group}
      </Text>
    return (
      <View style={styles.container}>
        {/*
          *  Строки изменения даты
        */}
        <View style={{flexDirection:'row',borderBottomWidth:1, justifyContent:'space-between', paddingVertical:10}}>
            <View style={{flex:1}}>
            </View>
            <View style={{
              flexDirection:'row',
              flex:1,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{fontSize:18, fontWeight:'500'}} >
                {this.state.date}
              </Text>
            </View>
            <View style={{
              flexDirection:'row',
              flex:1,
              paddingRight:15,
              justifyContent:'flex-end', 
            }}>
              <Icon size={30} underlayColor='#6C665677' name='calendar-edit' type='material-community'
                 onPress={async () => {this._chooseData()}}/>
            </View>
        </View>
        {/*
          *  Choose the group number...
        */}
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{flexDirection:'row', marginTop:5, borderBottomWidth:1}}>
            <View style={{}}>
              <Text style={{padding:15, fontSize:16}}>
                Choose the group number:
              </Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              {this.state.group?groupNumber:groupChooseIcon}
            </View>
          </View>
          <View style={{flex:1}}>
          </View>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD663',
  },
});
/*
BCKG -   FFD663
topClr - C59200
tabClr - 6C6656
C59200
9B7200
 */