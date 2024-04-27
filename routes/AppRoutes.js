import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import LandingPage from '../screens/LandingPage';

import MyComponent from '../screens/intro'; // Adjust paths as needed
import AnemiaTests from '../screens/AnemiaTests';

import HyperparathyroidismTests from '../screens/HyperparathyroidismTests';
import DiabetesTests from '../screens/DiabetesTests';
import MyDetailsComponent from '../screens/initaildetails';
import SymptomsForm from '../screens/SymptomsForm';
import PredictedDisease from '../screens/PredictedDisease';
import RecommendedTests from '../screens/RecommendedTests'; // Adjust the path as necessary
import TestForm from '../screens/TestForm'; // Adjust the path as necessary
import ChestXRayComponent from '../screens/ChestXRayComponent'; // Adjust the path as necessary
import DiagnosisReport from '../screens/DiagnosisReport'; // Adjust the path as necessary
import XrayReport from '../screens/XrayReport';





// Create the stack navigator
const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen name="DiagnosisReport" component={DiagnosisReport} options={{ title: 'Diagnosis Report' }} />
      <Stack.Screen name="ChestXRay" component={ChestXRayComponent} options={{ title: 'Chest X-Ray' }} />
      <Stack.Screen name="TestForm" component={TestForm} options={{ title: 'Test Form' }} />
      <Stack.Screen name="RecommendedTests" component={RecommendedTests} options={{ title: 'Recommended Tests' }} />
        {/* Landing Page Screen */}
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage} 
          options={{ title: 'Welcome' }}
        />
        {/* Introduction Screen */}
        <Stack.Screen 
          name="Intro" 
          component={MyComponent} 
          options={{ title: 'Intro' }} 
        />
        
        {/* Details Screen */}
        <Stack.Screen 
          name="MyDetails" 
          component={MyDetailsComponent} 
          options={{ title: 'Enter Your Details' }} 
        />
        {/* Symptoms Form Screen */}
        <Stack.Screen 
          name="SymptomsForm" 
          component={SymptomsForm} 
          options={{ title: 'Enter Symptoms' }} 
        />
        {/* Predicted Disease Screen */}
        <Stack.Screen  
          name="PredictedDisease" 
          component={PredictedDisease} 
          options={{ title: 'Predicted Disease' }}  
        />
        <Stack.Screen  
          name="AnemiaTests" 
          component={AnemiaTests} 
          options={{ title: 'Anemia tests' }}  
        />
         <Stack.Screen  
          name="HyperparathyroidismTests" 
          component={HyperparathyroidismTests} 
          options={{ title: 'HyperparathyroidismTests tests' }}  
        />
         <Stack.Screen  
          name="DiabetesTests" 
          component={DiabetesTests} 
          options={{ title: ' DiabetesTests tests' }}  
        />
           

<Stack.Screen name="XrayReport" component={XrayReport} options={{ title: 'X-Ray Report' }} />





        


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
