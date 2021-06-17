import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { NavigationParams } from 'react-navigation';
import * as Yup from "yup";

import { RootStoreContext } from '../../common/data/rootStore';
import { observer } from "mobx-react-lite";
import Screen from "../../common/components/Screen";
import {
    Form,
    FormField,
    SubmitButton,
} from "../../common/forms";

import colores from "../../config/colors";
import appStyles from "../../config/styles"
import defaultStyles from "../../config/styles";
import { TestApp } from "./TestApp";
import AppButton from "../../common/components/AppButton";

const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label('Title'),
	Description: Yup.string().required().min(1).label('Description'),
	
});

export interface myProps extends NavigationParams { }

const TestAppEdit: React.FC<myProps> = ({ navigation, route }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, submitting, loadItem, createItem, editItem, getList } = rootStore.testAppStore;

    const [testApp, setTestApp] = useState(new TestApp());
    const [error, setError] = useState("");

    React.useEffect(() => {
        let itemId = "";
        if (route.params) {
            itemId = route.params.itemId;
        }
        if (itemId) {
            loadItem(itemId).then((item) => {
                setTestApp(new TestApp(item));
            });
        }
    }, [loadItem])

    const onTestAppSubmit = (values, { setErrors }) => {
        debugger;
        if (!testApp.Id) {
            createItem(values).then((res) => {
                //setTestApp(new TestApp(res));
                getList().then(() => {
                    navigation.navigate("TestAppListing");
                });
            });
        }
        else {
            editItem(values)
                .then((res) => {
                    //setTestApp(new TestApp(res));
                    getList().then(() => {
                        navigation.navigate("TestAppListing");
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
                <Text style={appStyles.HeaderText} >TestApp</Text>
                <Form
                    initialValues={testApp}
                    onSubmit={onTestAppSubmit}
                    validationSchema={validationSchema}
                >
                    
					<FormField maxLength={255} name='Title' placeholder='Title' />
					<FormField maxLength={255} name='Description' placeholder='Description' />

                    {submitting ?
                        (<View style={styles.activityIndicatorView}>
                            <ActivityIndicator size="small" color={colores.primary} style={styles.activityIndicator} />
                            <Text style={defaultStyles.text}  >Updating catlog...</Text>
                        </View>)
                        :
                        (testApp.Id ?
                            (<SubmitButton title="Update" />)
                            :
                            (<SubmitButton title="Create" />)
                        )
                    }

                    <AppButton
                        title="Back to listing"
                        onPress={() => navigation.navigate("TestAppListing")}
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

export default observer(TestAppEdit); 
