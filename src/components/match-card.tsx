import {
  Card,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { StoreApi, UseBoundStore } from "zustand";
import { MatchStore } from "../pages/sets/[id]/match";
import { useMatchContext } from "../stores/use-match-store";

export interface MatchCardProps {
  index: number,
  subscribe: UseBoundStore<StoreApi<MatchStore>>
}

export const MatchCard: React.FC<MatchCardProps> = ({
  index,
  subscribe
}) => {
  const linkBg = useColorModeValue("white", "gray.800");
  const linkBorder = useColorModeValue("gray.200", "gray.700");
  let self = subscribe(e => e.terms[index]!)
  let zic = useMatchContext(e => e.requestZIndex)
  let [zI,setZi] = React.useState(zic())


  return (
    <motion.div drag dragMomentum={false} animate={{
      position: "absolute",
      top: self.y,
      left: self.x,
      zIndex: zI
    }} onDragStart={() => setZi(zic())}>
      <Card
        rounded="md"
        p="5"
        bg={linkBg}
        borderColor={linkBorder}
        borderWidth="2px"
        shadow="lg"
        transition="all ease-in-out 150ms"
        w="200px"
        position="absolute"
        _hover={{
          transform: "translateY(-2px)",
          borderBottomColor: "blue.300",
        }}
      >
        <Heading
          size="sm"
        >
          {self.word}
        </Heading>
      </Card>
    </motion.div>
  );
};