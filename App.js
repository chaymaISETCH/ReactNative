import * as React from 'react';
import {StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import rootReducer from "./src/reducers/rootReducer";
import EditProject from "./src/components/EditProject";
import ProjectsContent from "./src/components/ProjectsContent";
import Details from "./src/components/Details"; 
import CreateProject from "./src/components/CreateProject";
// A very simple store
let store = createStore(rootReducer);


let RootStack = createStackNavigator(
 {ProjectsContent: ProjectsContent,
  Details: Details,
  EditProject:EditProject,
  CreateProject: CreateProject},
 {initialRouteName : "ProjectsContent"}
);

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
