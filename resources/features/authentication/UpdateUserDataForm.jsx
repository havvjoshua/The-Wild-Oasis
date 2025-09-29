import SpinnerMini from "../../ui/SpinnerMini";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm, usePage } from "@inertiajs/react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;
function UpdateUserDataForm() {
    const { auth } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        cancel,
        isDirty,
    } = useForm({
        name: auth.user.name || "",
        email: auth.user.email || "",
        avatar: null,
    });

    const [initialData, setInitialData] = useState({
        name: auth.user.name || "",
        email: auth.user.email || "",
        avatar: null,
    });

    // Update form and initialData when the user prop changes
    useEffect(() => {
        const updatedData = {
            name: auth.user.name || "",
            email: auth.user.email || "",
            avatar: null,
        };
        setInitialData(updatedData);
        setData(updatedData);
    }, [auth.user]);

    // Compare form data with initialData
    function hasChanges() {
        return (
            data.name !== initialData.name ||
            data.email !== initialData.email ||
            data.avatar !== null
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!hasChanges()) {
            toast("No changes to update!", {
                icon: "🤔",
            });
            return;
        }

        try {
            post("/account", {
                preserveScroll: true,
                onSuccess: () => {
                    const updatedInitial = {
                        name: data.name,
                        email: data.email,
                        avatar: null, // reset avatar after upload
                    };
                    setInitialData(updatedInitial);
                    reset(updatedInitial);
                    clearErrors();
                    toast.success("User account successfully updated.");
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    function handleCancel() {
        reset(initialData); // correctly reset to last known good data
        clearErrors();
        cancel();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input
                    disabled
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
            </FormRow>
            {errors.email && <Error>{errors.email}</Error>}

            <FormRow label="Full name">
                <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </FormRow>
            {errors.name && <Error>{errors.name}</Error>}

            <FormRow label="Avatar image">
                <FileInput
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setData("avatar", e.target.files[0])}
                />
            </FormRow>
            {errors.avatar && <Error>{errors.avatar}</Error>}

            <FormRow>
                <Button
                    type="reset"
                    $size="medium"
                    $variation="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    $size="medium"
                    $variation="primary"
                    disabled={processing || !isDirty}
                >
                    {processing ? <SpinnerMini /> : "Update account"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
