import {
  Avatar,
  Heading, HStack, Link, Stack, Text, useColorModeValue
} from "@chakra-ui/react";
import { IconFolder } from "@tabler/icons-react";
import { useFolder } from "../../hooks/use-folder";
import { avatarUrl } from "../../utils/avatar";
import { plural } from "../../utils/string";

export const FolderHeading = () => {
  const folder = useFolder();

  const highlight = useColorModeValue("blue.500", "blue.200");

  return (
    <Stack spacing={4}>
      <HStack gap={2} fontWeight={600}>
        <Text>{plural(folder.sets.length, "set")}</Text>
        <Text>created by</Text>
        <HStack gap={0} fontWeight={700}>
          <Avatar src={avatarUrl(folder.user)} size="xs" />
          <Link
            href={`/@${folder.user.username}`}
            _hover={{ color: highlight }}
          >
            {folder.user.username}
          </Link>
        </HStack>
      </HStack>
      <HStack gap={2}>
        <IconFolder size={40} />
        <Heading size="2xl">{folder.title}</Heading>
      </HStack>
    </Stack>
  );
};