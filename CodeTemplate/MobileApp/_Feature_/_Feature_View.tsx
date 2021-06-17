import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { observer } from "mobx-react-lite";

import colors from "../../common/colors";
import defaultStyles from "../../common/styles";
import AppButton from "../../components/AppButton";
import { RootStoreContext } from "../../common/rootStore";
import { _Feature_ } from "./ _Feature_";
import Loader from "../../components/Loader";

const View _Feature_: React.FC<{ navigation: any, onBackToListing: any, _FeatureObj_ID: string }>
    = ({ navigation, onBackToListing, catlogID }) => {

        const rootStore = useContext(RootStoreContext);        
        const { loadingInitial, itemList, getList, deleteItem } = rootStore._FeatureObj_Store;

        const [_FeatureObj_, set _Feature_] = useState(new _Feature_());

        React.useEffect(() => {
            if (catlogID) {
                loadCategoryItem(catlogID).then((cat) => {
                    setTimeout(() => {
                        set _Feature_(new _Feature_(cat));
                    }, 200);
                });
            }
        }, [catlogID])

        return (
            <Loader style={styles.container} loading={loadingInitial}>
                <Text>DisplayName : {catlog.DisplayName} </Text>
                <Text>Category : {catlog["Category"]} </Text>
                <Text>Colores : {getColor(catlog.Colores)} </Text>
                <Text>Description : {catlog.Description} </Text>
                <Text>Price : {catlog.Price} </Text>
                <Text>Sizes : ??</Text>
                <Text>Photos :</Text>

                <AppButton title="Back to listing" onPress={onBackToListing} />
            </Loader>
        )
    }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default observer(View _Feature_); 