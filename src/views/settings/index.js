import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import Sidebar from '../../Components/sidebar/menu';
import { Drawer, Container } from 'native-base'
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default class Settings extends Component {
    openDrawer = () => {
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();        
    };
    _navigate=(routeName)=>{
      this.props.navigation.navigate(routeName)
    }
    render() {
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                tapToClose={true}
                negotiatePan={true}>
                <Container style={styles.container}>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Settings'} />
                        <View style={styles.content}>
                         <TouchableWithoutFeedback
                         onPress={()=>this._navigate('PasswordChange')}
                            style={styles.ChangePassView}>
                             <Text style={styles.changepassText}>Change Password</Text>
                         </TouchableWithoutFeedback>
                        </View>
                </Container>
            </Drawer>
        )
    }
}