import styled from "styled-components";
import Stats from "./Stats";

import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout({
    bookings,
    confirmedStays,
    cabinCount,
    last,
    salesData,
    startDate,
    endDate,
    todaysArrivals,
    todaysDepartures,
}) {
    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                cabinCount={cabinCount}
                last={last}
            />
            <TodayActivity
                todaysArrivals={todaysArrivals}
                todaysDepartures={todaysDepartures}
            />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart
                data={salesData}
                startDate={startDate}
                endDate={endDate}
            />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
