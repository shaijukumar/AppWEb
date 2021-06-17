import * as React from 'react';
import { useContext, useState, useEffect } from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { observer } from "mobx-react-lite";
import { FlatList } from "react-native-gesture-handler";
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

import { RootStoreContext } from "../../common/data/rootStore";
import Screen from "../../common/components/Screen";
import colors from "../../config/colors";
import appStyles from "../../config/styles";
import RightBottomButton from '../../common/components/RightBottomButton';
import DeleteIcon from '../../common/components/DeleteIcon';

export interface myProps extends NavigationStackScreenProps { }
const _Feature_Listing: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, itemList, getList, deleteItem } = rootStore._FeatureObj_Store;

    useEffect(() => {
        getList().then((lst) => {
        })
    }, [getList]);

    const onDeleteItem = (id) => {
        deleteItem(id).then(() => {
            getList();
        })
    }

    return (

        <Screen style={styles.screen} loading={loadingInitial}>
            <Text style={appStyles.HeaderText} >_Feature_ List</Text>
            <FlatList
                data={itemList}
                keyExtractor={(listing) => listing.Id ? listing.Id : '-'}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.Id}
                        style={styles.container}
                        onPress={() => { navigation.navigate("_Feature_Edit", { itemId: item.Id }); }}>
                        <Text style={styles.text}>
                            {item.##TitleField##}
                        </Text>
                        <DeleteIcon onPress={() => onDeleteItem(item.Id)} />

                    </TouchableOpacity>
                )}
            />

            <RightBottomButton
                onPress={() => { navigation.navigate("_Feature_Edit") }}
            />

        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
    container: {
        flexDirection: "row",
        padding: 5,
        marginTop: 3,
        backgroundColor: colors.lightMedium,
    },
    itemView: {
        flexDirection: "row"
    },
    text: {
        alignItems: "flex-start",
        textAlignVertical: 'center',
        color: colors.black,
        height: 50,
        paddingLeft: 10,
    }
})

export default observer(_Feature_Listing);