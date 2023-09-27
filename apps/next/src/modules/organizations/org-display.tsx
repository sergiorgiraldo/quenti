import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  IconArrowRight,
  IconAt,
  IconCircleDot,
  IconDiscountCheck,
} from "@tabler/icons-react";

import { useOrganization } from "../../hooks/use-organization";
import { organizationIcon } from "../../utils/icons";
import { getBaseDomain } from "./utils/get-base-domain";
import { useOnboardingStep } from "./utils/use-onboarding-step";

export const OrgDisplay = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const onboardingStep = useOnboardingStep();

  const { data: org } = useOrganization();
  const domain = getBaseDomain(org);

  const isLoaded = !!org;

  const Icon = organizationIcon(org?.icon || 0);

  const mutedColor = useColorModeValue("gray.700", "gray.300");

  return (
    <HStack spacing="6">
      <Skeleton isLoaded={isLoaded} fitContent rounded="full">
        <Center w="16" h="16" rounded="full" bg="blue.400">
          <Icon size={32} color="white" />
        </Center>
      </Skeleton>
      <Stack spacing={onboardingStep ? 2 : 0} flex="1" overflow="hidden">
        <Flex h="43.2px" alignItems="center" w="full">
          <SkeletonText
            isLoaded={isLoaded}
            fitContent
            noOfLines={1}
            skeletonHeight="36px"
            maxW="full"
          >
            <HStack w="full">
              <Heading
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                maxW="full"
              >
                {org?.name || "Loading..."}
              </Heading>
              {org?.published ? (
                <Box color="blue.300">
                  <Tooltip label="Verified organization">
                    <IconDiscountCheck aria-label="Verified" />
                  </Tooltip>
                </Box>
              ) : (
                <Box color="gray.500">
                  <Tooltip label="Not published">
                    <IconCircleDot aria-label="Not published" />
                  </Tooltip>
                </Box>
              )}
            </HStack>
          </SkeletonText>
        </Flex>
        {isLoaded && onboardingStep && (
          <Button
            leftIcon={<IconArrowRight />}
            w="max"
            size="sm"
            onClick={() => {
              void router.push(`/orgs/${id}/${onboardingStep}`);
            }}
          >
            Continue setup
          </Button>
        )}
        {domain?.domain && (
          <Flex h="21px" alignItems="center">
            <SkeletonText
              noOfLines={1}
              fitContent
              w="max-content"
              isLoaded={isLoaded}
              skeletonHeight="10px"
            >
              <HStack spacing="1" color={mutedColor}>
                <IconAt size="16" />
                <Text fontSize="sm">{domain?.domain}</Text>
              </HStack>
            </SkeletonText>
          </Flex>
        )}
      </Stack>
    </HStack>
  );
};