import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { NavigationParams } from 'react-navigation';
import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../../forms";
import { RootStoreContext } from "../../common/rootStore";




import colores from "../../config/colors";
import appStyles from "../../config/styles"
import defaultStyles from "../../config/styles";
import { _Feature_ } from "./_Feature_";
import AppButton from "../../common/components/AppButton";


import Screen from "../../common/components/Screen";


const validationSchema = Yup.object().shape({
    ##JSFormValidation##
});

export interface myProps extends NavigationParams { }

const _Feature_Edit: React.FC<myProps> = ({ navigation, route }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, submitting, loadItem, createItem, editItem, getList } = rootStore._FeatureObj_Store;

    const [_FeatureObj_, set_Feature_] = useState(new _Feature_());
    const [error, setError] = useState("");

    React.useEffect(() => {
        let itemId = "";
        if (route.params) {
            itemId = route.params.itemId;
        }
        if (itemId) {
            loadItem(itemId).then((item) => {
                set_Feature_(new _Feature_(item));
            });
        }
    }, [loadItem])

    const on_Feature_Submit = (values, { setErrors }) => {
        debugger;
        if (!_FeatureObj_.Id) {
            createItem(values).then((res) => {
                //set_Feature_(new _Feature_(res));
                getList().then(() => {
                    navigation.navigate("_Feature_Listing");
                });
            });
        }
        else {
            editItem(values)
                .then((res) => {
                    //set_Feature_(new _Feature_(res));
                    getList().then(() => {
                        navigation.navigate("_Feature_Listing");
                    });
                })
                .catch((err: string) => {
                    debugger;
                    setError("Error while update....");
                    console.log(err);
                })
        }
    }


    return (
        <Screen style={styles.container} loading={loadingInitial}>

            <ScrollView>
                <Text style={appStyles.HeaderText} >_Feature_</Text>
                <Form
                    initialValues={_FeatureObj_}
                    onSubmit={on_Feature_Submit}
                    validationSchema={validationSchema}
                >
                    ##JSFormFields##

                    {submitting ?
                        (<View style={styles.activityIndicatorView}>
                            <ActivityIndicator size="small" color={colores.primary} style={styles.activityIndicator} />
                            <Text style={defaultStyles.text}  >Updating...</Text>
                        </View>)
                        :
                        (_FeatureObj_.Id ?
                            (<SubmitButton title="Update" />)
                            :
                            (<SubmitButton title="Create" />)
                        )
                    }

                    <AppButton
                        title="Back to listing"
                        onPress={() => navigation.navigate("_Feature_Listing")}
                    />

                </Form>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    activityIndicatorView: {
        flexDirection: 'row',
        backgroundColor: colores.lightMedium,
        paddingLeft: 30
    },
    activityIndicator: {
        paddingRight: 30,
    }

});

export default observer(_Feature_Edit); 