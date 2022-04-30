import { FastField, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

type FormTextareaProps = {
    name: string;
    label?: string;
    text?: string;
} & React.ComponentProps<typeof Form.Control>;

const FormTextarea: React.FC<FormTextareaProps> = ({
    name,
    label,
    text,
    children,
    ...rest
}) => {
    return (
        <FastField name={name}>
            {({ field, form }: FieldProps) => (
                <Form.Group controlId={name} className="mb-3">
                    {label && <Form.Label>{label}</Form.Label>}
                    <Form.Control
                        {...field}
                        {...rest}
                        as="textarea"
                        rows={3}
                        isInvalid={!!(form.errors[name] && form.touched[name])}
                    />
                    {text && (
                        <Form.Text className="text-muted">{text}</Form.Text>
                    )}
                    <Form.Control.Feedback type="invalid">
                        {form.errors[name]}
                    </Form.Control.Feedback>
                </Form.Group>
            )}
        </FastField>
    );
};

export default FormTextarea;
