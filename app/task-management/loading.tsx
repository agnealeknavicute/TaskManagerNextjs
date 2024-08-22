import { Box, Skeleton, Stack } from "@chakra-ui/react";

export default function Loading(props: { skelNum: number }) {
  const skeletons = Array.from({ length: props.skelNum });
  return (
    <>
      {skeletons.map((s, index) => (
        <Box key={index} className="my-4 max-w-sm mx-auto">
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      ))}
    </>
  );
}
