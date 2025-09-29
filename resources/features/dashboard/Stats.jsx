import { differenceInCalendarDays } from "date-fns";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({
    bookings = [],
    confirmedStays = [],
    cabinCount = 0,
    last = null,
}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce(
        (total, b) => total + (b.total_price || 0),
        0
    );
    const checkins = confirmedStays.length;

    // Total booked nights
    /* const totalNightsBooked = bookings.reduce((acc, booking) => {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        const nights = differenceInCalendarDays(end, start);
        return acc + nights;
    }, 0); */
    const totalNightsBooked = bookings.reduce((acc, booking) => {
        if (!booking.start_date || !booking.end_date) return acc;

        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        const nights = differenceInCalendarDays(end, start);
        return acc + nights;
    }, 0);

    // Calculate days in range
    let daysInRange = 7; // fallback
    if (last) {
        daysInRange = parseInt(last, 10);
    } else if (bookings.length > 0) {
        const startDates = bookings.map((b) => new Date(b.start_date));
        const endDates = bookings.map((b) => new Date(b.end_date));
        const minDate = new Date(Math.min(...startDates));
        const maxDate = new Date(Math.max(...endDates));

        // Use date-fns here as well
        daysInRange = differenceInCalendarDays(maxDate, minDate) + 1;
    }

    const totalAvailableNights = cabinCount * daysInRange;

    const occupancyRate =
        totalAvailableNights > 0
            ? (totalNightsBooked / totalAvailableNights) * 100
            : 0;

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check-ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                //value={`${occupancyRate.toFixed(2)}%`}
                value={cabinCount > 0 ? `${occupancyRate.toFixed(2)}%` : "N/A"}
            />
        </>
    );
}

export default Stats;
