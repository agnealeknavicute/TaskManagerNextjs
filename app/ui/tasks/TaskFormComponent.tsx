"use client";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
} from "@chakra-ui/react";
import { TaskStatuses, TaskTypes } from "../../types/models";
import {
  rawTypeToRealType,
} from "../../helpers/typesSwitch-helper";
import { postTask } from "@/app/seed/route";

interface ITaskForm {
  title?: string;
  id?: string;
  description?: string;
  type?: 0 | 1 | 2;
  setUpdate?: ({}) => void;
  modal: boolean;
}

export default function TaskFormComponent(props: ITaskForm) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(props.title ? props.title : "");
  const [description, setDescription] = useState<string>(
    props.description ? props.description : ""
  );
  const [rawType, setRawType] = useState<0 | 1 | 2>(
    props.type ? props.type : 1
  );
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  useEffect(() => {
    setTitle(props.title || "");
  }, [props.title]);

  useEffect(() => {
    setDescription(props.description || "");
  }, [props.description]);

  useEffect(() => {
    if (props.type === 0) {
      setRawType(props.type);
    } else {
      setRawType(props.type || 1);
    }
  }, [props.type]);

  function validateTask() {
    let formValid = true;
    setTitleError(false);
    setDescriptionError(false);

    if (title.length < 3) {
      setTitleError(true);
      formValid = false;
    }
    if (description.length < 7) {
      setDescriptionError(true);
      formValid = false;
    }
    return formValid;
  }
  function navigate() {
    if (props.modal && props.setUpdate) {
      props.setUpdate({});
    } else {
      router.push("/task-managment/task-list");
    }
  }
  function sliderFn(val: 0 | 1 | 2) {
    setRawType(val);
  }
  function submitTask() {
    if (validateTask()) {
      const task = {
        id: props.id || Date.now().toString(),
        title: title,
        description: description,
        type: rawTypeToRealType(rawType),
        status: TaskStatuses.NotStarted,
        createdOn: new Date(),
      };
      postTask(task);

      navigate();
    }
  }

  return (
    <div className="flex justify-center">
      <Box
        className={clsx(" py-6 px-5", {
          "w-full phone:w-4/5 tablet:w-2/3 laptop:w-[400px]": !props.modal,
          "w-full ": props.modal,
        })}
      >
        <FormControl className="mb-4" isInvalid={titleError}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            focusBorderColor="#9F7AEA"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {!titleError ? (
            <FormHelperText>Enter the short title of the task</FormHelperText>
          ) : (
            <FormErrorMessage>Title is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl className="mb-4" isInvalid={descriptionError}>
          <FormLabel>Description</FormLabel>
          <Textarea
            focusBorderColor="#9F7AEA"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {!descriptionError ? (
            <FormHelperText>Enter the description of the task</FormHelperText>
          ) : (
            <FormErrorMessage>Description is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl className="mb-4" isInvalid={titleError}>
          <FormLabel>Type</FormLabel>
          <Slider min={0} max={2} step={1} value={rawType} onChange={sliderFn}>
            <SliderTrack bg="purple.100">
              <SliderFilledTrack bg="purple.500" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <FormHelperText className="flex justify-between">
            <p>{TaskTypes.LowUrgency}</p>
            <p>{TaskTypes.MediumUrgency}</p>
            <p>{TaskTypes.HighUrgency}</p>
          </FormHelperText>
        </FormControl>
        <Button
          onClick={submitTask}
          className=" mt-4 float-end"
          colorScheme="purple"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
