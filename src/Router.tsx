import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens";
import { H2OButton } from "./components";
import { SvgEnum, Colors } from "./utils";

const Stack = createNativeStackNavigator();

const Router = () => {
  const [settingsModalVisible, setSettingsModalVisible] =
    React.useState<boolean>(false);
  const handleButtonPress = (navigation: any) => {
    setSettingsModalVisible(!setSettingsModalVisible);
    navigation.setParams({ setttingsModalVisible: !settingsModalVisible });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            headerTintColor: Colors.white,
            headerShadowVisible: false,
            headerRight: () => (
              <H2OButton
                onPress={() => handleButtonPress(navigation)}
                svg={SvgEnum.Settings}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
