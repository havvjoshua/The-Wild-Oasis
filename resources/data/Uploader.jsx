import { useState } from "react";
import Button from "../ui/Button";

function Uploader() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div
            style={{
                marginTop: "auto",
                backgroundColor: "#e0e7ff",
                padding: "8px",
                borderRadius: "5px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <h3>SAMPLE DATA</h3>

            <Button>Upload ALL</Button>

            <Button>Upload bookings ONLY</Button>
        </div>
    );
}

export default Uploader;
