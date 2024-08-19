"use client";

import { statusColor, typeColor } from "@/app/helpers/badgeColors";
import { formatDate } from "@/app/helpers/dateFormat";
import { getTask } from "@/app/seed/route";
import Loading from "@/app/task-managment/loading";
import { ITask } from "@/app/types/models";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Heading,
  Stack,
  Box,
  Divider,
  Spacer,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskEditComponent from "./TaskEditComponent";

export default function TaskCardComponent({ id }: { id: string }) {
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async (id: string) => {
      const task = await getTask(id);
      setTask(task);
      setLoading(false);
    };
    fetchTasks(id);
  }, [update]);

  return (
    <>
      {task && !loading ? (
        <Box className="w-2/3  mx-auto">
          <Stack spacing="5">
            <Box className="flex items-center">
              <Heading size="md">{task.title}</Heading>
              <Spacer />
              <Menu>
                <MenuButton
                  size="xs"
                  colorScheme="purple"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  Actions
                </MenuButton>
                <MenuList>
                  <TaskEditComponent
                    id={task.id}
                    type={task.type}
                    title={task.title}
                    description={task.description}
                    setUpdate={setUpdate}
                  />
                  <MenuItem>Assign</MenuItem>
                  <MenuItem>Change type</MenuItem>
                  <MenuItem>Change status</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Text>{task.description}</Text>
          </Stack>
          <Divider className="mt-4 mb-1" />
          <Box className="flex items-center">
            <Text className="text-xs text-slate-700">
              {formatDate(task.createdOn)}
            </Text>
            <Spacer />
            <Badge className="mr-2" colorScheme={statusColor(task.status)}>
              {task.status}
            </Badge>
            <Badge colorScheme={typeColor(task.type)}>{task.type}</Badge>
          </Box>
        </Box>
      ) : (
        <Loading skelNum={1} />
      )}
    </>
  );
}
