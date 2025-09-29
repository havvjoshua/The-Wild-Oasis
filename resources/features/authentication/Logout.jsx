import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useForm } from "@inertiajs/react";
function Logout() {
    const { post, processing } = useForm();
    function handleLogout(e) {
        e.preventDefault();

        post("/logout");
    }
    return (
        <ButtonIcon onClick={handleLogout} disabled={processing} title="Logout">
            <HiArrowRightOnRectangle />
        </ButtonIcon>
    );
}

export default Logout;
