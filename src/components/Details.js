import React,{Component} from 'react';
import { connect } from 'react-redux';

import firebase from "../firebase/firebaseConfig";
import { Button,Text, View, StyleSheet } from 'react-native';

class Details extends React.Component {
    static navigationOptions = ({navigation})=>{
     return{ title: "Projet : "+navigation.getParam("title")}
    };
    constructor(props) {
      super(props);
  
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
      if (!this.props.project) {
        return null;
       
      }
      return (
       
        <View style={styles.container}>

  <View style={styles.c}>
<Text style={styles.paragraph}>Nom de Projet</Text>

<Text style={styles.paragraph2}>{this.state.nom_projet || ""}</Text>
</View>
<View style={styles.c}>
<Text style={styles.paragraph}>Description</Text>

<Text style={styles.paragraph2}>{this.state.description || ""}</Text>
</View>

<View style={styles.c}>
<Text style={styles.paragraph}>Chef de Projet</Text>

<Text style={styles.paragraph2}>{this.state.chef_projet || ""}</Text>
</View>
<View style={styles.c}>
<Text style={styles.paragraph}>Duree</Text>

<Text style={styles.paragraph2}>{this.state.duree || ""} Jours</Text>
</View>
<View style={styles.c}>
<Text style={styles.paragraph}>Date Début</Text>

<Text style={styles.paragraph2}>{this.state.date_debut  || ""}</Text>
</View>



<View style={{  flexDirection:"row",
margin:20,
    justifyContent: 'center', 
     alignItems:"center" }}>
<Button
style={{flex:1, justifyContent: "center",
align: "center",margin : 20,
backgroundColor: "#17a2b8"}}
  title="Modifier"
  onPress = {() => {
    let currentComponent = this;
    this.props.navigation.navigate("EditProject",{
      id : currentComponent.state.id,
      title: currentComponent.state.nom_projet
    });
  }}
    
/>
<Button
style={{ flex:1,justifyContent: "center",
alignItems: "right",margin : 20,
marginRight:0,
align: "right",
backgroundColor: "#17a2b8"}}
  title="Supprimer"
onPress={() => {
              
  console.log("supp");

  let currentComponent = this;
  let db = firebase.firestore();
  var docRef = db.collection("projets");
  docRef
    .doc(currentComponent.state.id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
   }}




/>
</View>
        </View>
          );
    }
  }
  
 /*export default connect(state => ({ count: state.count }))(
    Details
  );
  
*/
const mapStateToProps = (state, ownProps) => {
  return {
    project: state.filter(i => i.id === ownProps.navigation.getParam("id"))
  };
};


export default connect(
  mapStateToProps
)(Details);
const styles = StyleSheet.create({
  c:{
    flexDirection:"row",
    borderBottomColor: '#6B9EFA',
    borderBottomWidth: 1,
    justifyContent: 'center', 
     alignItems:"center" 
  },
    container: {
      flex: 1,
   
     
      padding: 8,
    },
    paragraph: {
      flex: 1,
      margin: 15,
      fontSize: 18,
     color:"black",
      textAlign: 'left',
    },
    paragraph2: {
      flex: 1,
      margin:15,
      fontSize: 18,
     
      textAlign: 'right',
    },
  });
  