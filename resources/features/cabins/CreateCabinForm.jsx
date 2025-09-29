import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm({ onCloseModal }) {
    const initialState = {
        name: "",
        maxCapacity: "",
        regularPrice: "",
        discount: 0,
        description: "",
        image: null,
    };
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        cancel,
        clearErrors,
    } = useForm(initialState);

    function cancelFormSubmit() {
        cancel();
        reset();
        clearErrors();
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            post("/cabins", {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast.success("Cabin created successfully.");
                    onCloseModal?.();
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <Form onSubmit={handleSubmit} type={onCloseModal ? "modal" : "regular"}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    disabled={processing}
                />
                {errors.name && <Error>{errors.name}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    value={data.maxCapacity}
                    onChange={(e) => setData("maxCapacity", e.target.value)}
                    disabled={processing}
                />
                {errors.maxCapacity && <Error>{errors.maxCapacity}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    type="number"
                    id="regularPrice"
                    value={data.regularPrice}
                    onChange={(e) => setData("regularPrice", e.target.value)}
                    disabled={processing}
                />
                {errors.regularPrice && <Error>{errors.regularPrice}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    value={data.discount}
                    onChange={(e) => setData("discount", e.target.value)}
                    disabled={processing}
                />
                {errors.discount && <Error>{errors.discount}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="text"
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    disabled={processing}
                />
                {errors.description && <Error>{errors.description}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    type="file"
                    id="image"
                    onChange={(e) => setData("image", e.target.files[0])}
                />

                {errors.image && <Error>{errors.image}</Error>}
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    onClick={() => onCloseModal?.()}
                    type="button"
                    $variation="secondary"
                    $size="small"
                >
                    Cancel
                </Button>
                <Button
                    $variation="primary"
                    $size="medium"
                    type="submit"
                    disabled={processing}
                >
                    Create new cabin
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
