import { Flex, HStack, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";

export const HeadingAreaSkeleton = () => {
  return (
    <Stack spacing={4}>
      <Skeleton>
        <Heading size="2xl">Loading...</Heading>
      </Skeleton>
      <Flex justifyContent="space-between" maxW="1000px" h="32px">
        <HStack fontWeight={600} spacing={2}>
          <Skeleton w="18px" h="18px" rounded="full" />
          <Skeleton fitContent h="18px">
            <HStack>
              <Text>Public</Text>
              <Text>•</Text>
              <Text>10 terms</Text>
            </HStack>
          </Skeleton>
        </HStack>
      </Flex>
    </Stack>
  );
};