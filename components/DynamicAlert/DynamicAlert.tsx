import { StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Alert,
  HStack,
  VStack,
  IconButton,
  CloseIcon,
} from "native-base";

interface AlertProps {
  text: string;
  status: "info" | "warning" | "success" | "error";
  style?: object;
  onClose: () => void;
}

export const DynamicAlert = ({ text, status, onClose, style }: AlertProps) => {
  return (
    <Alert style={style} w="100%" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {text}
            </Text>
          </HStack>
          <IconButton
            onPress={onClose}
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: "coolGray.600",
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};
