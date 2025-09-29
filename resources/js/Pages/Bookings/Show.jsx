import BookingDetail from "../../../features/bookings/BookingDetail";
import AppLayout from "../../../ui/AppLayout";

function Show({ booking }) {
    return (
        <AppLayout>
            <>
                <BookingDetail booking={booking} />
            </>
        </AppLayout>
    );
}

export default Show;
