import FormInput from 'components/FormInput';
import FormTextarea from 'components/FormTextarea';
import { Form, Formik, FormikHelpers } from 'formik';
import { useFetch } from 'hooks';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authUserSelector } from 'redux/authSlice/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addStream, updateStream } from 'redux/streamsSlice/actions';
import { Stream } from 'types';
import * as Yup from 'yup';

export type StreamFormType = {
    title: string;
    descriptions: string;
};

export interface StreamFormProps {
    formInitial?: Stream;
    initialLoading?: boolean;
}

const StreamForm: React.FC<StreamFormProps> = ({
    formInitial,
    initialLoading,
}) => {
    const { isLoading, queryData } = useFetch<Stream>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(authUserSelector);
    const initialValues = formInitial ?? {
        title: '',
        descriptions: '',
    };

    const formLoading = isLoading || initialLoading;

    const validationSchema: Yup.SchemaOf<StreamFormType> = Yup.object({
        title: Yup.string().required('Title is required'),
        descriptions: Yup.string().required('Descriptions is required'),
    });

    const onSubmit = async (
        dataSubmit: StreamFormType,
        formHelper: FormikHelpers<StreamFormType>
    ) => {
        if (!currentUser) {
            toast.error('You should log in to create a stream');
            return;
        }

        if (formInitial?.id) {
            queryData(
                {
                    url: `streams/${formInitial.id}`,
                    config: {
                        method: 'PATCH',
                        body: JSON.stringify(dataSubmit),
                    },
                },
                response => {
                    if (response.id) {
                        dispatch(updateStream(response));
                        toast.success('Update live stream successfully');
                        formHelper.resetForm();
                        setTimeout(() => {
                            navigate(`/streams/${formInitial.id}`, {
                                replace: true,
                            });
                        }, 0);
                    }
                }
            );
        } else {
            queryData(
                {
                    url: 'streams',
                    config: {
                        method: 'POST',
                        body: JSON.stringify({
                            ...dataSubmit,
                            userId: currentUser.googleId,
                            userName: currentUser.name,
                            createdAt: new Date(),
                        }),
                    },
                },
                response => {
                    if (response.id) {
                        dispatch(addStream(response));
                        toast.success('Create live stream successfully');
                        formHelper.resetForm();
                        setTimeout(() => navigate('/', { replace: true }), 0);
                    }
                }
            );
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                return (
                    <Form>
                        <FormInput name="title" label="Title" />
                        <FormTextarea
                            name="descriptions"
                            label="Descriptions"
                        />
                        <Button
                            variant="dark"
                            type="submit"
                            className="w-100"
                            disabled={!formik.isValid || formLoading}
                        >
                            {(() => {
                                switch (true) {
                                    case formLoading === true: {
                                        return <Spinner animation="border" />;
                                    }
                                    case !!formInitial?.id: {
                                        return 'Update a stream';
                                    }
                                    default:
                                        return 'Create new stream';
                                }
                            })()}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StreamForm;
