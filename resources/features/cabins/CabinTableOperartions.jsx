import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperartions({ sortOptions, currentSort, filterOptions }) {
    return (
        <TableOperations>
            <Filter filterField="discount" options={filterOptions} />
            <SortBy options={sortOptions} currentSort={currentSort} />
        </TableOperations>
    );
}

export default CabinTableOperartions;
