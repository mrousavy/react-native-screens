import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../shared';

type StackParamList = {
  Details: { index: number };
};

interface DetailsScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Details'>;
  route: RouteProp<StackParamList, 'Details'>;
}

const DetailsScreen = ({
  navigation,
  route,
  letter,
}: DetailsScreenProps & { letter: number }): JSX.Element => {
  const colors = [
    'snow',
    'cornsilk',
    'papayawhip',
    'bisque',
    'peachpuff',
    'orange',
    'coral',
    'orangered',
    'red',
  ];

  const index = route.params?.index ? route.params?.index : 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Details screen #${index}`,
    });
  }, [navigation]);

  const currentColor =
    index < colors.length ? colors[index] : colors[colors.length - 1];

  return (
    <View style={{ ...styles.container, backgroundColor: currentColor }}>
      <Button
        title={`More details ${index}`}
        accessibilityLabel={`More details ${index}`}
        testID={`bottom-tabs-${letter}-more-details-button`}
        onPress={() => navigation.push('Details', { index: index + 1 })}
      />
      {index === 0 ? (
        <Button
          onPress={() => navigation.pop()}
          title="🔙 Back to Examples"
          testID="bottom-tabs-go-back-button"
        />
      ) : null}
    </View>
  );
};

const createStack = (letter: string) => {
  const Stack = createNativeStackNavigator();

  const StackWithDetails = () => (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Text testID={`bottom-tabs-${letter}-header-right-id`}>{letter}</Text>
        ),
      }}>
      <Stack.Screen name="Details">
        {({ navigation, route }) => (
          <DetailsScreen
            navigation={navigation}
            route={route as RouteProp<StackParamList, 'Details'>}
            letter={letter}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return StackWithDetails;
};

const AStack = createStack('A');
const BStack = createStack('B');
const CStack = createStack('C');
const DStack = createStack('D');

const Tab = createBottomTabNavigator();

const NavigationTabsAndStack = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen
      name="A"
      component={AStack}
      options={{ tabBarButtonTestID: 'bottom-tabs-A-tab' }}
    />
    <Tab.Screen
      name="B"
      component={BStack}
      options={{ tabBarButtonTestID: 'bottom-tabs-B-tab' }}
    />
    <Tab.Screen name="C" component={CStack} />
    <Tab.Screen name="D" component={DStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

export default NavigationTabsAndStack;
