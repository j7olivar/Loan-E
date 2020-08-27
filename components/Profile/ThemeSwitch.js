import React, { useState } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";

const ThemeSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
         Theme
      </Text>
      <Switch
        
        trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    height:65,
    paddingLeft:22,
    paddingRight:18,
    alignItems:'center',
  },
  text: {
   fontSize: 15,
   paddingRight: 150,
   paddingTop: 5
  },
});

export default ThemeSwitch;