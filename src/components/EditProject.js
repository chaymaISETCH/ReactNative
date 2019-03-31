import React, { Component } from "react";
import firebase from "../firebase/firebaseConfig";
import { List, ListItem } from "react-native-elements";
import { connect } from 'react-redux';
import Toast, { DURATION } from "react-native-easy-toast";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

class EditProject extends Component {
    
    static navigationOptions = ({navigation})=>{
        return{ title: "Projet : "+navigation.getParam("title")}
       };
  
      constructor(props) {
        super(props);
    
        console.log(this.props.project);
        const p = this.props.project[0];
        this.state = {
            id:p.id,
          nom_projet: p.nom_projet,
          description: p.description,
          date_debut: p.date_debut,
          duree: p.duree,
          chef_projet: p.chef_projet
        };
      }
    

  render() {
    return (
      <ScrollView style={styles.container}>
        <Toast ref="toast" />
        <TextInput
          style={styles.input}
          
          value={this.state.nom_projet}
          onChangeText={text => this.setState({ nom_projet: text })}
        />

        <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
        />

        <TextInput
          style={styles.input}
          value={this.state.duree}
          keyboardType="numeric"
          onChangeText={text => this.setState({ duree: text })}
        />
        <TextInput
          style={styles.input}value={this.state.date_debut}
          onChangeText={text => this.setState({ date_debut: text })}
        />
        <TextInput
          style={styles.input}value={this.state.chef_projet}
          onChangeText={text => this.setState({ chef_projet: text })}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
              
            console.log(this.state);
                      
            let db = firebase.firestore();
            var docRef = db
              .collection("projets")
              .doc(this.state.id);

            docRef
              .update({
                nom_projet: this.state.nom_projet,
                duree: this.state.duree,
                date_debut: this.state.date_debut,
                description: this.state.description,
                chef_projet: this.state.chef_projet
              })
              .then(function() {
                alert("modification effectuée avec succés");
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          }}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: "#17a2b8",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  saveBtn: {
    width: windowWidth,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6B9EFA"
  },
  container: {
    paddingTop: 30,

    padding: 20
  },
  input: {
    padding: 10,
    margin: 15,
    height: 40,
    color: "#17a2b8",
    borderColor: "#17a2b8",
    borderWidth: 1
  },
  submitButton: {
    fontSize: 20,
    backgroundColor: "#17a2b8",

    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});


const mapStateToProps = (state, ownProps) => {
    return {
      project: state.filter(i => i.id === ownProps.navigation.getParam("id"))
    };
  };
 
  export default connect(
    mapStateToProps
  )(EditProject);
