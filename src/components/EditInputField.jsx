import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Input, Text, Button, HStack } from "@chakra-ui/react";

export default function EditInputField({
  initialIsEditing,
  initialValue,
  itemIdRef,
  itemId,
  handleSubmit,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [value, setValue] = useState(initialValue);
  const [autoFocus, setAutoFocus] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    itemIdRef.current.itemId = itemId;
    itemIdRef.current.description = value;
    setIsEditing(false);
    // window.dispatchEvent(
    //   new KeyboardEvent("keydown", {
    //     key: "tab",
    //   })
    // );
    handleSubmit({ initialValue, value });
  };

  return (
    <HStack width="100%">
      {isEditing && (
        <Input
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdate();
            }
          }}
          onBlur={handleUpdate}
          onSubmit={handleUpdate}
          {...props}
          value={value}
          autoFocus={autoFocus}
          sx={{ border: "1px", borderColor: "blue.100" }}
        />
      )}
      {!isEditing && (
        <Text {...props} pl="1rem" fontWeight="600">
          {value}
        </Text>
      )}
      <Button
        onClick={() => {
          setAutoFocus(true);
          itemIdRef.current.itemId = itemId;
          setIsEditing(!isEditing);
        }}
        ml="0.3rem"
        mr="0.3rem"
        variant="ghost"
        colorScheme="blue"
        fontSize="xl"
      >
        <AiFillEdit />
      </Button>
    </HStack>
  );
}
