import React from "react";
import { Flex } from "@chakra-ui/core";

export function Layout({ children }) {
  return (
    <Flex align="center" justify="center" h="935px">
      <Flex
        w="660px"
        h="500px"
        bg="white"
        justify="center"
        boxShadow="0 24px 30px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)"
      >
        {children}
      </Flex>
    </Flex>
  );
}
