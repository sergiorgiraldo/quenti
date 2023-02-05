import { Container, Divider, Stack, useColorModeValue } from "@chakra-ui/react";
import type { ComponentWithAuth } from "../../../../components/auth-component";
import { ActionArea } from "../../../../modules/folders/action-area";
import { FolderDescription } from "../../../../modules/folders/folder-description";
import { FolderHeading } from "../../../../modules/folders/folder-heading";
import { FolderSets } from "../../../../modules/folders/folder-sets";
import { HydrateFolderData } from "../../../../modules/hydrate-folder-data";

const FolderPage: ComponentWithAuth = () => {
  const dividerColor = useColorModeValue("gray.400", "gray.600");

  return (
    <HydrateFolderData>
      <Container maxW="7xl" marginTop="10" marginBottom="20">
        <Stack spacing={12}>
          <Stack spacing={8}>
            <FolderHeading />
            <ActionArea />
          </Stack>
          <Stack spacing={6}>
            <FolderDescription />
            <Divider borderColor={dividerColor} />
            <FolderSets />
          </Stack>
        </Stack>
      </Container>
    </HydrateFolderData>
  );
};

FolderPage.authenticationEnabled = true;

export default FolderPage;

export { getServerSideProps } from "../../../../components/chakra";