import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import Screen from "../../../../Common/Screen";
import {
  AppForm,
  AppFormField,
  ButtonGroup,
  SubmitButton,
  AppButton,
} from "../../../../Common/Formik";

import _WpName_RootStore from "../_WpName_Root/_WpName_RootStore";
import { _ListTitle_ } from "./_ListTitle_Store";
import { Formik } from "formik";

const _ListTitle_Edit: React.FC = () => {
  const { categoryStore, spContext } = useContext(_WpName_RootStore);

  const [category, set_ListTitle_] = useState(new _ListTitle_());
  const [load, setLoad] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  let { id } = useParams();
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label("Title"),
  });

  useEffect(() => {
    debugger;
    if (id) {
      setLoad(true);
      categoryStore.getItemById(id).then((val) => {
        debugger;
        set_ListTitle_(new _ListTitle_(val as any));
        setLoad(false);
      });
    }
  }, [categoryStore.getItemById]);

  const onSubmit = (values: any) => {
    debugger;
    setSubmitting(true);
    categoryStore.updateListItem(values).then(() => {
      history.push("/_ListTitle_List");
    });
  };

  const onBack = () => {
    history.push("/_ListTitle_List");
  };

  const onDelete = () => {
    setSubmitting(true);
    debugger;
    categoryStore.deleteListItem(id).then(() => {
      setSubmitting(false);
      history.push("/_ListTitle_List");
    });
  };

  return (
    <Screen loading={false}>
      <AppForm
        initialValues={category}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        loadingInitial={load}
      >
        <AppFormField name="Title" placeholder="Title" />

        <ButtonGroup>
          <SubmitButton title="Submit" loader={submitting} />
          <AppButton title="Delete" onClick={onDelete} loader={submitting} />
          <AppButton title="Back" onClick={onBack} loader={submitting} />
        </ButtonGroup>
      </AppForm>
    </Screen>
  );
};

export default _ListTitle_Edit;
