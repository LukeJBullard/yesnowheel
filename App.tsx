/**
 * Yesnowheel
 * https://github.com/lukejbullard/yesnowheel
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  useColorScheme,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity
} from 'react-native';

import Turbine from 'turbine-js';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  //io props
  const [output, setOutput] = useState("Yes No Wheel");
  
  const [loading, setLoading] = useState(false);

  //styling props
  const [outputColor, setOutputColor] = useState(isDarkMode ? "#FFFFFF" : "#000000");
  
  const {fontScale} = useWindowDimensions();

  const styles = () => StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: isDarkMode ? "black" : "white"
    },
    text: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      color: !isDarkMode ? "black" : "white",
      fontSize: 25 / fontScale
    },
    outputText: {
      fontSize: 50 / fontScale,
      height: "10%",
      color: outputColor
    },
    loadingWheel: {
      display: 'flex',//(loading ? 'flex' : 'none'),
      flex: 1,
      justifyContent: 'center'
    },
    button: {
      height: "80%",
      width: "100%",
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? (!loading ? "#191919" : "#303030") : (!loading ? "#CCCCCC" : "#EEEEEE"),
    },
    buttonText: {
      flexDirection: 'row',
      textAlign: 'center',
      fontSize: 120 / fontScale,
      color: !isDarkMode ? (!loading ? "black" : "#666666") : (!loading ? "white" : "#CCCCCC")
    }
  });

  const onPress3 = () => {
    let low = 0;
    let high = 1;
    let certainty = 5;
    let delay = 100;

    if (loading)
      return;
    setLoading(true);
    setOutputColor(isDarkMode ? "#FFFFFF" : "#000000");
    setOutput("Turbine...");

    var tb = new Turbine();
    tb.waitForReady().then(() => {
      tb
      .query(low, high, certainty, delay)
      .then((responseValue: number) => {
          if (responseValue == 1)
          {
            setOutput("Yes");
            setOutputColor("#33CC33");
          } else {
            setOutput("No");
            setOutputColor("#EE5555");
          }

          setLoading(false);
      })
    });
  };

  return (
    <SafeAreaView style={styles().body}>
      <Text style={[styles().text, styles().outputText]}>{output}</Text>
      <View style={styles().loadingWheel}>
        <ActivityIndicator size="large" animating={loading} color="#3535c1" />
      </View>
      <TouchableOpacity disabled={loading} style={styles().button} onPress={onPress3}>
        <Text style={styles().buttonText}>3</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
