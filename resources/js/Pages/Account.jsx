import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import AppLayout from "../../ui/AppLayout";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";

function Account() {
    return (
        <AppLayout>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <Heading as="h1">Update your account</Heading>

                <Row type="vertical">
                    <Heading as="h3">Update user data</Heading>
                    <UpdateUserDataForm />
                </Row>

                <Row type="vertical">
                    <Heading as="h3">Update password</Heading>
                    <UpdatePasswordForm />
                </Row>
            </StyleSheetManager>
        </AppLayout>
    );
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
    if (typeof target === "string") {
        // For HTML elements, forward the prop if it is a valid HTML attribute
        return isPropValid(propName);
    }
    // For other elements, forward all props
    return true;
}

export default Account;
