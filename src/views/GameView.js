'use strict';

import React, { Component } from 'react';

import { Text,  StyleSheet,  View, Image, TouchableOpacity, TextInput, SafeAreaView, Modal, FlatList } from 'react-native';
import { theme } from '../constants/theme'
import { padding, margin, renderIf } from '../utils/utils'
import { get_widthPercentage, get_heightPercentage, StatusBarHeight } from '../utils/helpers'
import { CustomStyles } from '../constants/styles'

import CustomHeader from './customHeader'

import { getGames, checkFirstPlayer, cleanGame, makingAMove, gameListener } from '../firebase/data'

class GamesView extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      finishIcon:require('../assets/Icons/point.png'),
      isMenuOn:false,
      positions:['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      mySymbol:'0',
      modalVisible:false,
      readyToListen:0,
      images:['../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png', '../assets/Icons/point.png']
    }
  }
  headerOptions = {
    back: false,
    icon: true,
    config: false,
    logout: true
  }
  third =  get_widthPercentage(90)/3;

  componentDidMount(){
    checkFirstPlayer(this.initialGame)
    gameListener(this.updateBoard)
  }
  selectedOption = (data) =>{
    const { navigation } = this.props;
    navigation.navigate('Games', data)
  }
  initialGame=(data)=>{
    var currentSymbol='0'
    if (data.data()['player1'][0]== data.user_id){
      currentSymbol = data.data()['player1'][1]
    }else if(data.data()['player2'][0]== data.user_id){
      currentSymbol = data.data()['player2'][1]
    }
    this.setState({
      mySymbol:currentSymbol
    })
  }
  allAreEqual=(array)=> {
    const result = array.every(element => {
      if ((element === array[0])&& element !="0") {
        return true;
      }
    });
  
    return result;
  }
  checkingWinner=()=>{
    var winnerMoves = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,5,7]]
    for (let i in winnerMoves){
      let currentCheck = []
      for (let x in winnerMoves[i]){
        currentCheck.push(this.state.positions[winnerMoves[i][x]])
      }
      if(this.allAreEqual(currentCheck)){

        this.setState({
          modalVisible:true
        })
        if(this.state.mySymbol==this.state.positions[winnerMoves[i][0]]){
          this.setState({
            finishIcon: require('../assets/Icons/medal.png')
          })
        }else{
          this.setState({
            finishIcon: require('../assets/Icons/crying.png')
          })
        }
      }
    }
  }
  makingMoves = (index)=>{
    var matrix = this.state.positions
    matrix[index] = this.state.mySymbol
    makingAMove(matrix)
  }
  updateBoard=(data)=>{

      var mov = []
      for (var i in data.moves){
        if(data.moves[i]=='x'){
          mov[i] = require("../assets/Icons/x_r.png")
        }else if (data.moves[i]=='o'){
          mov[i] = require("../assets/Icons/o_b.png")
        }else if (data.moves[i]=='0'){
          mov[i] = require("../assets/Icons/point.png")
        }
      }
      this.setState({
        positions: data.moves,
        images: mov
      }, ()=>{
        this.checkingWinner();
      })
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ marginTop:StatusBarHeight, width:theme.SIZES.width, height:get_heightPercentage(100)-StatusBarHeight}} >
        <CustomHeader  { ...this.headerOptions } navigation={this.props.navigation}/>
        <View style={{ flex:0, alignSelf:"center" }} >
          <View style={{ flex:0, ...margin(0, 0) }} >
            <TextInput
              style={{ width:get_widthPercentage(90), height:50, ...CustomStyles.inputs.placeHolder}}
              placeholder='Search games'
              secureTextEntry={false}
              keyboardType='default'
              returnKeyLabel='Search'
            />
          </View>
        </View>
        <SafeAreaView style={{ justifyContent:'center', width:theme.SIZES.width, marginTop:26, height:get_heightPercentage(100)-(StatusBarHeight + 125)}} >
        <View style={{ flex: 0, alignSelf: "center", height:get_widthPercentage(90), width:get_widthPercentage(90), flexDirection:'row'  }} >
          <View style={{ flex: 0, flexDirection:"row", height:this.third, width:this.third*3}} > 
            <View style={{ flex: 0, height:this.third, width:this.third, borderStartColor: 'gray'}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(0) } >
                <Image source = { this.state.images[0]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(1) } >
                <Image source = { this.state.images[1]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(2) } >
                <Image source = { this.state.images[2]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 0, flexDirection:"row", left:-this.third*3, top:this.third, height:this.third, width:this.third*3}} > 
            <View style={{ flex: 0, height:this.third, width:this.third, borderStartColor: 'gray'}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(3) } >
                <Image source = { this.state.images[3]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(4) } >
                <Image source = { this.state.images[4]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(5) } >
                <Image source = { this.state.images[5]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 0, flexDirection:"row", left:-this.third*6, top:this.third*2, height:this.third, width:this.third*3}} > 
            <View style={{ flex: 0, height:this.third, width:this.third, borderStartColor: 'gray'}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(6) } >
                <Image source = { this.state.images[6]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(7) } >
                <Image source = { this.state.images[7]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0, height:this.third, width:this.third}} > 
              <TouchableOpacity
                style={{...CustomStyles.buttons.gameButtonsActive, width: this.third-2}}
                onPress={ () => this.makingMoves(8) } >
                <Image source = { this.state.images[8]} resizeMode='center' style={{ ...CustomStyles.images.gameImage }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 0, alignItems: "center", justifyContent: "flex-end", ...margin(30, 60, 0, 60) }} >
          <TouchableOpacity
            style={{ borderRadius: 30, backgroundColor: theme.COLORS.primary, ...padding(12, 30) }}
            onPress={ ()=> cleanGame() } >
            <Text style={{ color: theme.COLORS.white, ...theme.FONTS.caption, ...theme.AUTO_WEIGHTS.bold }} >CLEAN</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0, alignItems: "center", justifyContent: "flex-end", ...margin(30, 60, 0, 60) }} >
          <TouchableOpacity
            style={{ borderRadius: 30, backgroundColor: theme.COLORS.primary, ...padding(12, 30) }}
            onPress={ ()=>  checkFirstPlayer(this.initialGame) } >
            <Text style={{ color: theme.COLORS.white, ...theme.FONTS.caption, ...theme.AUTO_WEIGHTS.bold }} >init</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

            <Image source = { this.state.finishIcon } resizeMode='center' style={{ ...CustomStyles.images.gameImage, width:100, height:100, }} />
            <TouchableOpacity
            style={{ borderRadius: 30, backgroundColor: theme.COLORS.primary, ...padding(12, 30), top:100 }}
            onPress={ ()=> {
              this.setModalVisible(!modalVisible)
              cleanGame()
            } } >
            <Text style={{ color: theme.COLORS.white, ...theme.FONTS.caption, ...theme.AUTO_WEIGHTS.bold }} >CLOSE</Text>
          </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width:get_widthPercentage(100),
    height:100,
    backgroundColor: 'rgb(242, 242, 242)',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width:get_widthPercentage(100),
    height:300,
    marginBottom: 0,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeModal: {
    alignSelf:'flex-end',
    borderRadius:30,
    backgroundColor:theme.COLORS.white, 
    ...padding(2, 2),
    marginRight: 20,
    marginTop:10
  }
});
export default GamesView;