/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { Platform, StyleSheet, View, TextInput, Text } from "react-native";
import { SelectableText } from "./SelectableText.js";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: {
        first: [],
        second: [
          { start: 1, end: 20 },
          { start: 22, end: 27 },
        ],
        third: [],
      },
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  addSecondHighlight(newValue) {
    this.setState({
      ...this.state,
      highlights: {
        ...this.state.highlights,
        second: [...this.state.highlights.second, newValue],
      },
    });
  }

  updateSecondHighlights(newValues) {
    this.setState({
      ...this.state,
      highlights: {
        ...this.state.highlights,
        second: newValues,
      },
    });
  }

  handleSelection(opts) {
    const mapper = {
      two: () => {
        if (opts.isUpdate) {
          return this.updateSecondHighlights(opts.mergedSelections);
        }
        this.addSecondHighlight({
          start: opts.selectionStart,
          end: opts.selectionEnd,
        });
      },
    };

    mapper[opts.id] && mapper[opts.id]();
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <SelectableText
          id="one"
          selectable={true}
          menuItems={["Foo", "Bar"]}
          onSelection={console.log}
          style={styles.welcome}
          value="Astrocoders"
          editable={false}
          multiline
        />
        <SelectableText
          id="two"
          selectable={true}
          menuItems={["Astro", "Coders", "Store"]}
          highlightMenuItems={["UPDATE"]}
          style={styles.instructions}
          value="-Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend laoreet risus nec accumsan. In bibendum urna id ante vehicula auctor. Donec ipsum nisi, malesuada quis erat ac, molestie facilisis lacus. Vestibulum a erat dui. In imperdiet, purus at venenatis fermentum, dui neque congue est, in suscipit metus magna malesuada ex. In hendrerit tincidunt mi, vel rhoncus eros dignissim non. Nulla tincidunt, tortor et dictum fermentum, sapien leo blandit nunc, nec rutrum nulla libero nec elit. Sed vitae urna sed eros volutpat venenatis. Nulla finibus velit ac odio elementum pharetra. Ut mollis metus est, vitae blandit urna venenatis at."
          highlights={this.state.highlights.second}
          highlightColor="red"
          onSelection={this.handleSelection}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FF0000",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    color: "#0000FF",
  },
});
