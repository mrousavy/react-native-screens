import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  SettingsInput,
  SettingsPicker,
  SettingsSwitch,
  Square,
  Button,
  ToastProvider,
  useToast,
} from '../shared';

type StackParamList = {
  Main: undefined;
  Settings: undefined;
};

interface MainScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
}

const MainScreen = ({ navigation }: MainScreenProps): JSX.Element => {
  useEffect(() => {
    navigation.navigate('Settings');
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Go to next screen"
      />
      <Button onPress={() => navigation.pop()} title="🔙 Back to Examples" />
    </ScrollView>
  );
};

type HeaderItemPosition = 'right' | 'center' | 'left';

interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Settings'>;
}

const SettingsScreen = ({ navigation }: SettingsScreenProps): JSX.Element => {
  const [headerTitle, setHeaderTitle] = useState('Settings');
  const [backButtonVisible, setBackButtonVisible] = useState(true);
  const [headerShown, setHeaderShown] = useState(true);
  const [headerLargeTitle, setHeaderLargeTitle] = useState(true);
  const [headerItem, setHeaderItem] = useState<HeaderItemPosition>('right');
  const [headerBackTitle, setHeaderBackTitle] = useState('Back');
  const [headerShadowVisible, setHeaderShadowVisible] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(false);

  const square = (props: { tintColor?: string }) => (
    <Square {...props} color="green" size={20} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: backButtonVisible,
      headerBackTitleVisible: backButtonVisible, // iOS
      headerLargeTitle, // iOS
      headerBackTitle, // iOS
      headerShown,
      headerRight: headerItem === 'right' ? square : undefined,
      headerTitle: headerItem === 'center' ? square : headerTitle,
      headerLeft: headerItem === 'left' ? square : undefined,
      headerShadowVisible,
      headerTransparent,
    });
  }, [
    navigation,
    headerTitle,
    backButtonVisible,
    headerLargeTitle,
    headerBackTitle,
    headerItem,
    headerShown,
    headerShadowVisible,
    headerTransparent,
  ]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      <SettingsInput
        label="Header title"
        value={headerTitle}
        onValueChange={setHeaderTitle}
      />
      <SettingsSwitch
        label="Back button visible"
        value={backButtonVisible}
        onValueChange={setBackButtonVisible}
      />
      <SettingsSwitch
        label="Header shown"
        value={headerShown}
        onValueChange={setHeaderShown}
      />
      <SettingsSwitch
        label="Header shadow visible"
        value={headerShadowVisible}
        onValueChange={setHeaderShadowVisible}
      />
      <SettingsSwitch
        label="Header transparent"
        value={headerTransparent}
        onValueChange={setHeaderTransparent}
      />
      <SettingsPicker<HeaderItemPosition>
        label="Header item"
        value={headerItem}
        onValueChange={item => {
          if (item === 'left' && backButtonVisible) {
            // to make header's item ideally on the left side,
            // we need to hide the back button.
            setBackButtonVisible(false);
          }
          setHeaderItem(item);
        }}
        items={['left', 'center', 'right']}
      />
      <Text style={styles.heading}>iOS only</Text>
      <SettingsSwitch
        label="Header large title"
        value={headerLargeTitle}
        onValueChange={setHeaderLargeTitle}
      />
      <SettingsInput
        label="Header back title"
        value={headerBackTitle}
        onValueChange={setHeaderBackTitle}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator<StackParamList>();

const App = (): JSX.Element => (
  <ToastProvider>
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
      }}>
      <Stack.Screen
        name="Main"
        options={{
          title: 'Header Options',
        }}
        component={MainScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTintColor: 'hotpink',
        }}
      />
    </Stack.Navigator>
  </ToastProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  heading: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
