import React, {
    Component
  } from "react";
  import add from "../images/add.png";
  import firebase from "../firebase/firebaseConfig";
  import { getProjectsAction, removeProject,addProject,editProject } from "../actions";
  import { connect } from "react-redux";
  import { 
    List,
    ListItem
  } from "react-native-elements";
  import Toast, {
    DURATION
  } from "react-native-easy-toast";
  import {
    TouchableHighlight,
    StyleSheet,
    View,Image,
    Dimensions,
    FlatList,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
  } from "react-native";
  
  const {
    width: windowWidth,
    height: windowHeight
  } = Dimensions.get("window");
  
  //*********************************** */
  
  //************************************** */
  class ProjectsContent extends Component {
    static navigationOptions = {
        title: 'Liste des Projets',
      };
    
    //************************************************* */
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        loading:true
      };
    }
    //***************************************************** */
    componentDidMount() {
      console.log("did mount");
      this.getProjets();
    }
    getProjets() {
      console.log("getting projects");
      let currentComponent = this;
      let db = firebase.firestore();
      var docRef = db.collection("projets");
      let projects = [];
   
    //************************EVENT */
    docRef.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          console.log("add event");
          
        

          let p = { ...change.doc.data(), id: change.doc.id };
          console.log("New project: ", p);
          currentComponent.props.addProject(p);
          currentComponent.props.navigation.navigate("ProjectsContent");
        }
        if (change.type === "modified") {
          console.log("edit project");
          console.log("Modified project: ", change.doc.data());
          let p = { ...change.doc.data(), id: change.doc.id };
          console.log("edit project: ", p);
          currentComponent.props.editProject(p);
          currentComponent.props.navigation.navigate("ProjectsContent");

        }
        if (change.type === "removed") {
          console.log("remove project");
          let p = { ...change.doc.data(), id: change.doc.id };
          console.log("Removed project: ", p);
          currentComponent.props.removeProject(change.doc.id);
          currentComponent.props.navigation.navigate("ProjectsContent");

        }
      });
    });
    //******************************* */
    
      //******************************* */
      docRef
      .get()
      .then(function(doc) {
        console.log("Document data:", doc);
        doc.forEach(d => {
          console.log(d.data());
          projects.push({ ...d.data(), id: d.id });
        });
        console.log(projects);

        currentComponent.props.getProjectsAction(projects);
        currentComponent.setState({ loading: false });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  
    //****************************************** */
    componentWillUnmount() {
      let db = firebase.firestore();
      var unsubscribe = db.collection("projets").onSnapshot(function() {
        console.log("Stop listening to changes");
      });
      // ...
      // Stop listening to changes
      unsubscribe();
    }
    //************************************************** */
  
    render() {
    
 
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          
        <Text style={styles.paragraph}>Chargement...</Text>
      </View>
       
      );
    }

      return ( <View style={{flex:1}}>
        
         <FlatList style = {styles.flat}
        data = {this.props.projects}

        renderItem = {
          ({item}) => ( <ListItem
          
            onPress = {() => {
this.props.navigation.navigate("Details",{
  id : item.id,
  title: item.nom_projet
})



                console.log("navigate");}}
  
            style = {
              styles.row
            }
            key={item.id}
            title = {
              'nom de projet : ' +item.nom_projet
            }
            subtitle = {
              'chef de projet : ' +
              item.chef_projet
            }
            />
          )
        }
        />
        <TouchableHighlight onPress = {() => {
          console.log("add");
        
        
this.props.navigation.navigate("CreateProject");
        
        }}
       style={{position:'absolute',bottom:10,right:10}}
  
        >
         <Image
            style={{width:80,height:80,right:0,padding:10}}
            source={add}
          />
          </TouchableHighlight>
          
          </View >
      );
    }
  }
  var styles = StyleSheet.create({
    row: {
      elevation: 1,
      borderRadius: 2,
  
      flex: 1,
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
  
    },
    flat: {
      marginTop: 35,
  
    },
    text: {
      color: "#17a2b8",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    z:{},
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
    },
    
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
  });
  
 
  const mapDispatchToState = {
    getProjectsAction,
    removeProject,
    addProject,
    editProject
  };
  
  const mapStateToProps = state => {
    return {
      projects: state
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToState
  )(ProjectsContent);
  