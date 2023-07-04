import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconBrain,
  IconCards,
  IconLayersSubtract,
  IconReport,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Link } from "../../components/link";
import { menuEventChannel } from "../../events/menu";
import { useSet, useSetReady } from "../../hooks/use-set";

export const LinkArea = () => {
  const { id } = useSet();

  return (
    <Grid
      w="full"
      maxW="1000px"
      gridTemplateColumns={{
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr 1fr",
      }}
      gap={4}
    >
      <GridItem>
        <Linkable
          name="Learn"
          icon={<IconBrain />}
          href={`/${id}/learn`}
          requireAuth
        />
      </GridItem>
      <GridItem>
        <Linkable
          name="Flashcards"
          icon={<IconCards />}
          href={`/${id}/flashcards`}
        />
      </GridItem>
      <GridItem>
        <Linkable
          name="Test"
          icon={<IconReport />}
          href="/#coming-soon"
          disabled
          requireAuth
        />
      </GridItem>
      <GridItem>
        <Linkable
          name="Match"
          icon={<IconLayersSubtract />}
          href={`/${id}/match`}
          requireAuth
        />
      </GridItem>
    </Grid>
  );
};

interface LinkableProps {
  name: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
  requireAuth?: boolean;
}

const Linkable: React.FC<LinkableProps> = ({
  name,
  icon,
  href,
  disabled = false,
  requireAuth = false,
}) => {
  const ready = useSetReady();
  const authed = useSession().status == "authenticated";
  const authEnabled = requireAuth && !authed;

  const bg = useColorModeValue("white", "gray.750");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const disabledHeading = useColorModeValue("gray.600", "gray.400");
  const disabledBorder = useColorModeValue("white", "gray.750");
  const disabledHover = useColorModeValue("gray.200", "gray.600");

  const overlay = !authEnabled ? (
    <LinkOverlay as={Link} href={href}>
      {name}
    </LinkOverlay>
  ) : (
    name
  );

  return (
    <Skeleton rounded="lg" isLoaded={ready}>
      <LinkBox
        bg={bg}
        rounded="lg"
        py="5"
        px="6"
        borderWidth="2px"
        borderBottomWidth="4px"
        h="full"
        borderColor={!disabled ? borderColor : disabledBorder}
        shadow={!disabled ? "xl" : "sm"}
        transition="all ease-in-out 150ms"
        _hover={{
          transform: "translateY(-2px)",
          borderBottomColor: !disabled ? "blue.300" : disabledHover,
        }}
        cursor="pointer"
        onClick={() => {
          if (authEnabled)
            menuEventChannel.emit("openSignup", {
              message: `Create an account for free to study with ${name}`,
              callbackUrl: href,
            });
        }}
      >
        <Flex gap={4}>
          <Box color="blue.300">{icon}</Box>
          <Heading size="md" color={disabled ? disabledHeading : undefined}>
            {overlay}
          </Heading>
        </Flex>
      </LinkBox>
    </Skeleton>
  );
};
