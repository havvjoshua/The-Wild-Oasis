import { router } from "@inertiajs/react";
import Select from "./Select";

function SortBy({ options, currentSort }) {
    function handleChange(e) {
        const sortBy = e.target.value;

        const params = new URLSearchParams(window.location.search);
        params.set("sort_by", sortBy);
        params.delete("page"); // Reset to first page on sort change

        router.get(window.location.pathname, Object.fromEntries(params), {
            preserveState: true,
            replace: true,
        });
    }
    return (
        <Select
            onChange={handleChange}
            value={currentSort || "latest"}
            options={options}
            type="white"
        />
    );
}

export default SortBy;
