import { Chip, Skeleton, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Tags = ({ selectedTags, setSelectedTags, setPage }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/tags`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ margin: "5rem 2rem 0 2rem" }}>
      <Chip.Group position="left" value={selectedTags} onChange={setSelectedTags} multiple mt={15}>
        <Text fz={22} fw="bold">
          Tags:{" "}
        </Text>
        {tags && tags.length > 0
          ? tags.map((tag) => (
              <Chip
                key={tag._id}
                value={tag.name}
                variant="filled"
                size="xs"
                onClick={() => {
                  setPage(1);
                  const newSelectedTags = selectedTags.includes(tag.name) ? selectedTags.filter((selectedTag) => selectedTag !== tag.name) : [...selectedTags, tag.name];
                  setSelectedTags(newSelectedTags);
                }}
              >
                {tag.name}
              </Chip>
            ))
          : Array.from(new Array(10), (val, i) => i + 1).map((id, i) => <Skeleton key={i} height={22} radius="xl" width="70px" />)}
      </Chip.Group>
    </div>
  );
};
// console.log(tag._id);

export default Tags;
