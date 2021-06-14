import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SplashScreen,
  BlankPage,
  ExamplePage,
  HomePage,
  HistoryPage,
  ProfilePage,
  SignUpPage,
  SignInPage,
  DetailEventPage,
  QrCodePage,
} from './view';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {sys_colors, sys_font} from './utils/constants';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'profile') {
            iconName = 'user';
          } else {
            iconName = 'history';
          }
          return (
            <Icons
              name={iconName}
              color={
                focused ? sys_colors.icon.active : sys_colors.icon.unactive
              }
              size={20}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: sys_colors.icon.active,
        inactiveTintColor: sys_colors.icon.unactive,
        style: {backgroundColor: sys_colors.secondary},
        labelStyle: {
          fontFamily: sys_font.primary[200],
          fontSize: 10,
        },
      }}>
      <Tab.Screen name="home" component={HomePage} options={{title: 'Home'}} />
      <Tab.Screen
        name="history"
        component={HistoryPage}
        options={{title: 'History'}}
      />
      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="example"
          component={ExamplePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="blank"
          component={BlankPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUpPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signin"
          component={SignInPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="homepage"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="detailEvent"
          component={DetailEventPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="qrcode"
          component={QrCodePage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
