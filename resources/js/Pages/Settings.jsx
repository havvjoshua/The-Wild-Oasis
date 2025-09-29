import UpdateSettingsForm from "../../features/settings/UpdateSettingsForm";
import AppLayout from "../../ui/AppLayout";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Settings({ settings }) {
    return (
        <AppLayout>
            <Row type="vertical">
                <Heading as="h1">Update hotel settings</Heading>
                <UpdateSettingsForm settings={settings} />
            </Row>
        </AppLayout>
    );
}

export default Settings;
