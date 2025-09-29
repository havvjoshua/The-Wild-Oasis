import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { usePage } from "@inertiajs/react";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import { format, parseISO } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

function SalesChart({ data, startDate, endDate }) {
    const { theme } = usePage().props;
    const isDarkMode = theme === "dark";
    //console.log(data);

    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    if (!data || data.length === 0) {
        return <p>No sales data available for the selected period.</p>;
    }

    const formattedStart = startDate
        ? format(parseISO(startDate), "dd MMM")
        : "";
    const formattedEnd = endDate ? format(parseISO(endDate), "dd MMM") : "";

    return (
        <StyledSalesChart>
            <Heading as="h2">
                {startDate && endDate
                    ? `Sales from ${formattedStart} to ${formattedEnd}`
                    : "Sales Overview"}
            </Heading>

            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={data}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        tickFormatter={formatNumber}
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2}
                        name="Total Sales"
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2}
                        name="Extras Sales"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;
