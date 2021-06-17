import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import { AppForm, FormField, SubmitButton, AppButton, ButtonGroup } from "../../app/Formik";
import { RootStoreContext } from "../../app/store/rootStore";
import { PageTag } from "./PageTag";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required().min(1).label('Title'),
	
});

interface DetailParms {
  id: string;
}

const PageTagItemEdit: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, submitting, loadItem, createItem, editItem, getList, deleteItem } = rootStore.pageTagStore;

  const [pageTag, setPageTag] = useState(new PageTag());

  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (id) {
      loadItem(id).then((pageTag) => {
        setPageTag(new PageTag(pageTag));
      });
    } else {
      setPageTag(new PageTag());
    }
  }, [loadItem, id]);

  const onPageTagSubmit = (values: any) => {
    editItem(values).then((pageTag) => {
      setPageTag(new PageTag((pageTag as any)));
    });
  };

  const onDelete = () => {
    deleteItem(pageTag.Id).then(() => {
      history.push('/PageTagList');
    });
  };

  return (
    <AppForm
      initialValues={pageTag}
      validationSchema={validationSchema}
      onSubmit={onPageTagSubmit}
      loadingInitial={loadingInitial}
    >
      
					<FormField maxLength={255} name='Title' placeholder='Title' />

      <ButtonGroup>
        <SubmitButton title={pageTag.Id === '' ? "Create" : "Update"} loader={submitting} />
        {pageTag.Id && <AppButton title="Delete" onClick={() => onDelete()} loader={submitting} />}
        <AppButton title="Back" onClick={() => { history.push('/PageTagList'); }} loader={submitting} />
      </ButtonGroup>
    </AppForm>
  );
};

export default observer(PageTagItemEdit);

