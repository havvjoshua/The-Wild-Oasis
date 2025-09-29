import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { usePage } from "@inertiajs/react";

function BookingTable({
    bookings,
    guests,
    cabins,
    to,
    from,
    current_page,
    last_page,
    total,
}) {
    if (!bookings.length) return <Empty resourceName="bookings" />;
    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow
                            key={booking.id}
                            booking={booking}
                            guests={guests}
                            cabins={cabins}
                        />
                    )}
                />

                <Table.Footer>
                    <Pagination
                        to={to}
                        from={from}
                        current_page={current_page}
                        last_page={last_page}
                        total={total}
                    />
                </Table.Footer>
            </Table>
        </Menus>
    );

    // return <div>hekko</div>;
}

export default BookingTable;
