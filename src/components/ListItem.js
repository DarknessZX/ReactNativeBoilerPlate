import React , { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
import { UIManager, Platform } from 'react-native';


class ListItem extends Component {
  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
      if (this.props.expanded) {
        return (
          <CardSection>
            <Text>{this.props.item.description}</Text>
          </CardSection>
        )
      }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress = {() => { this.props.selectLibrary(this.props.item.id)} }
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{this.props.item.title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  titleStyle : {
    fontSize : 18,
    paddingLeft : 15
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.item.id;
  return { expanded }
}

export default connect(mapStateToProps, actions)(ListItem);
