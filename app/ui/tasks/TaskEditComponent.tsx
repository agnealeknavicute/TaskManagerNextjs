"use client";

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  MenuItem,
} from "@chakra-ui/react";
import { TaskTypes } from "@/app/types/models";
import TaskFormComponent from "./TaskFormComponent";
import { realTypeToRawType } from "@/app/helpers/typesSwitch-helper";

interface ITaskEditComponent {
  title: string;
  description: string;
  type: TaskTypes;
  id: string;
  setUpdate: ({}) => void;
}

export default function TaskEditComponent(props: ITaskEditComponent) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <TaskFormComponent
            modal={true}
            id={props.id}
            type={realTypeToRawType(props.type)}
            title={props.title}
            description={props.description}
            setUpdate={props.setUpdate}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
