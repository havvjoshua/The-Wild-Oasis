import SignupForm from "../../features/authentication/SignupForm";
import AppLayout from "../../ui/AppLayout";
import Heading from "../../ui/Heading";

function NewUsers() {
    return (
        <>
            <AppLayout>
                <Heading as="h1">Create a new user</Heading>
                <SignupForm />
            </AppLayout>
        </>
    );
}

export default NewUsers;
