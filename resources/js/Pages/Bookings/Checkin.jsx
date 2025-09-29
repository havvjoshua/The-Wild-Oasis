import CheckinBooking from "../../../features/check-in-out/CheckinBooking";
import AppLayout from "../../../ui/AppLayout";

function Checkin({ booking }) {
    return (
        <AppLayout>
            <>
                <CheckinBooking booking={booking} />
            </>
        </AppLayout>
    );
}

export default Checkin;
