import AppLayout from "../../../ui/AppLayout";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import BookingTable from "../../../features/bookings/BookingTable";
import BookingTableOperations from "../../../features/bookings/BookingTableOperations";
import { usePage } from "@inertiajs/react";

function Index({ cabins, guests, filters }) {
    const { data, total, to, from, current_page, last_page } =
        usePage().props.bookings;

    const sortOptions = [
        { value: "latest", label: "Sort by date (latest)" },
        { value: "oldest", label: "Sort by date (oldest)" },
        { value: "price-low-high", label: "Price (Low to High)" },
        { value: "price-high-low", label: "Price (High to Low)" },
    ];

    const filterOptions = [
        { value: "all", label: "All" },
        { value: "checked-out", label: "Checked out" },
        { value: "checked-in", label: "Checked in" },
        { value: "unconfirmed", label: "Unconfirmed" },
    ];
    return (
        <AppLayout>
            <>
                <Row type="horizontal">
                    <Heading as="h1">All bookings</Heading>
                    <BookingTableOperations
                        filters={filters}
                        sortOptions={sortOptions}
                        filterOptions={filterOptions}
                    />
                </Row>

                <BookingTable
                    bookings={data}
                    guests={guests}
                    cabins={cabins}
                    to={to}
                    total={total}
                    current_page={current_page}
                    last_page={last_page}
                    from={from}
                />
            </>
        </AppLayout>
    );
}

export default Index;
