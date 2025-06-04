import React from "react";
import { Modal as RNModal, StyleSheet, View } from "react-native";
import { Colors } from "../Colors/Color.types";
import Icon from "../Icon";
import { IconSize } from "../Icon/Icon.types";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.closeButton}>
            <Icon
              ic="close"
              size={IconSize.MEDIUM}
              isClickable
              onClick={onClose}
            />
          </View>
          <View>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    maxHeight: 500,
  },
  closeButton: {
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
});
