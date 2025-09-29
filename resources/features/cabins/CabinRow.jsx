import { useForm } from "@inertiajs/react";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";

import toast from "react-hot-toast";
import styled from "styled-components";
import CabinEditForm from "./CabinEditForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

/* const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`; */

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { processing, delete: destroy } = useForm();

    const {
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        id: cabinId,
    } = cabin;

    function handleDeleteCabin(e) {
        e.preventDefault();

        try {
            destroy(`/cabins/${cabinId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Cabin deleted successfully🗑️");
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} quests.</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}

            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="edit">
                            <CabinEditForm cabin={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete">
                            <ConfirmDelete
                                cabin={cabin}
                                resourceName="cabin"
                                disabled={processing}
                                onConfirm={handleDeleteCabin}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
