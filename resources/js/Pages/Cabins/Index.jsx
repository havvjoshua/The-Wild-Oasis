import CabinTable from "../../../features/cabins/CabinTable";
import AppLayout from "../../../ui/AppLayout";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import AddCabin from "../../../features/cabins/AddCabin";
import CabinTableOperartions from "../../../features/cabins/CabinTableOperartions";

function Index({ cabins, searchParams }) {
    // console.log(searchParams);
    const sortOptions = [
        { value: "name_asc", label: "Sort by name (A-Z)" },
        { value: "name_desc", label: "Sort by name (Z-A)" },
        {
            value: "price_asc",
            label: "Sort by price (low first)",
        },
        {
            value: "price_desc",
            label: "Sort by price (high first)",
        },
        {
            value: "maxCapacity_asc",
            label: "Sort by capacity (low first)",
        },
        {
            value: "maxCapacity_desc",
            label: "Sort by capacity (high first)",
        },
    ];

    const filterOptions = [
        { value: "all", label: "All" },
        { value: "no-discount", label: "No discount" },
        { value: "with-discount", label: "With discount" },
    ];

    return (
        <AppLayout>
            <>
                <Row type="horizontal">
                    <Heading as="h1">All cabins</Heading>
                    <CabinTableOperartions
                        sortOptions={sortOptions}
                        currentSort={searchParams.sort_by}
                        filterOptions={filterOptions}
                    />
                </Row>

                <Row type="vertical">
                    <CabinTable cabins={cabins} searchParams={searchParams} />

                    <AddCabin />
                </Row>
            </>
        </AppLayout>
    );
}

export default Index;
