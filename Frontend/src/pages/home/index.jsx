import { Button, Center, SimpleGrid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import HeaderLayout from "../../components/header";
import Post from "../../components/post";
import Tags from "../../components/post/Tags";
import axios from "axios";

const Home = () => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [pages, setPages] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTag();
  }, []);

  useEffect(() => {
    getAllProduct();
    // }, [page, selectedTags, category, text]);
  }, [page, selectedTags, text]);

  const getAllTag = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tags`);
      const { tag } = data;
      setTags(tag);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      setIsLoading(true);

      // const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?q=${text}&page=${page}&tag=${selectedTags}&category=${category}`);
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?q=${text}&page=${page}&tag=${selectedTags}&category=`);

      const { data: products, pages: totalPages } = data;
      setPages(totalPages);
      setData(products);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <HeaderLayout setText={setText} setPage={setPage} />
      <Tags tags={tags} selectedTags={selectedTags} setPage={setPage} setSelectedTags={setSelectedTags} />
      <Center>
        <SimpleGrid
          cols={4}
          px={{ base: "1rem", lg: "2rem" }}
          py="1rem"
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          <Post text={text} page={page} setPage={setPage} setPages={setPages} selectedTags={selectedTags} />
        </SimpleGrid>
      </Center>
      <Center mt="1rem">
        <div className="pagination" style={{ display: "flex", alignItems: "center", margin: "20px" }}>
          <Button type="submit" mt="sm" style={{ backgroundColor: "#1f9ca4", flex: 1 }} onClick={previous} disabled={page <= 1}>
            Prev
          </Button>
          <p style={{ flex: 1, textAlign: "center", margin: "0 10px" }}>
            {page}/{pages}
          </p>
          <Button type="submit" mt="sm" style={{ backgroundColor: "#1f9ca4", flex: 1 }} onClick={next} disabled={page >= pages}>
            Next
          </Button>
        </div>
      </Center>
      <Footer />
    </div>
  );
};

export default Home;
