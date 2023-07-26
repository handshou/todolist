import { useState } from "react";
import {
  Button,
  ListItem,
  List,
  Heading,
  Checkbox,
  HStack,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";

export default function Todolist() {
  const initItems = [
    { isChecked: true, link: "", description: "Go to www.mysql.com" },
    { isChecked: true, link: "", description: "Download installer" },
    { isChecked: false, link: "", description: "Execute" },
    { isChecked: false, link: "", description: "Review" },
    { isChecked: false, link: "", description: "Todo 1" },
    { isChecked: false, link: "", description: "Todo 2" },
  ];

  const [items, setItems] = useState(initItems);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          height: "85vh",
          p: "0",
        }}
      >
        <Box>
          <Heading pb="0.5rem">Checklist</Heading>
          <List>
            {items.map((todo) => (
              <HStack
                spacing={"1rem"}
                sx={{
                  flex: 1,
                  flexDir: "col",
                  alignItems: "center",
                  pb: "0.3rem",
                }}
              >
                <Checkbox isChecked={todo.isChecked}></Checkbox>
                <ListItem
                  sx={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <Button>View</Button>
                  <Text pl={"1rem"}>{todo.description}</Text>
                </ListItem>
              </HStack>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}
