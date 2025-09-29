import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations({ filters, sortOptions, filterOptions }) {
    return (
        <TableOperations>
            <Filter filterField="status" options={filterOptions} />

            <SortBy options={sortOptions} currentSort={filters.sort_by} />
        </TableOperations>
    );
}

export default BookingTableOperations;
