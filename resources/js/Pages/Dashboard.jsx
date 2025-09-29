import AppLayout from "../../ui/AppLayout";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import DashboardLayout from "../../features/dashboard/DashboardLayout";
import DashboardFilter from "../../features/dashboard/DashboardFilter";

function Dashboard({
    bookings,
    confirmedStays,
    last,
    cabinCount,
    salesData,
    startDate,
    endDate,
    todaysArrivals,
    todaysDepartures,
}) {
    return (
        <AppLayout>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout
                bookings={bookings}
                confirmedStays={confirmedStays}
                last={last}
                cabinCount={cabinCount}
                salesData={salesData}
                startDate={startDate}
                endDate={endDate}
                todaysArrivals={todaysArrivals}
                todaysDepartures={todaysDepartures}
            />
        </AppLayout>
    );
}

export default Dashboard;
