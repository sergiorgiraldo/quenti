import React from "react";

import { HeadSeo, Link } from "@quenti/components";

import { Flex, Heading, IconButton } from "@chakra-ui/react";

import { IconArrowLeft, IconSettings } from "@tabler/icons-react";

import { useSet } from "../../hooks/use-set";
import { useLearnContext } from "../../stores/use-learn-store";
import { LearnSettingsModal } from "./learn-settings-modal";

export const Titlebar = () => {
  const { id, title } = useSet();

  const completed = useLearnContext((s) => s.completed);
  const currentRound = useLearnContext((s) => s.currentRound);

  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <>
      <HeadSeo title={`Learn: ${title}`} />
      <LearnSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        dirtyOnReset
      />
      <Flex alignItems="center">
        <IconButton
          icon={<IconArrowLeft />}
          aria-label="Back"
          variant="ghost"
          as={Link}
          href={`/${id}`}
        />
        <Heading size="lg" textAlign="center" flex="1">
          {completed ? "Review" : `Round ${currentRound + 1}`}
        </Heading>
        <IconButton
          icon={<IconSettings />}
          aria-label="Back"
          variant="ghost"
          onClick={() => {
            setSettingsOpen(true);
          }}
        />
      </Flex>
    </>
  );
};
