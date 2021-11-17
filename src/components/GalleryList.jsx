import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Row, Form, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../store/auth-context";
import GalleryItem from "./GalleryItem";
import LoadingSpinner from "./UI/LoadingSpinner";

const GalleryList = () => {
  const [query, setQuery] = useState("");
  const { uid } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [fileredList, setFilteredList] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://your-photo-album-default-rtdb.firebaseio.com/images/${uid}.json`
      )
      .then((response) => {
        const data = response.data;
        let loadedList = [];
        for (const key in data) {
          loadedList.push({
            id: key,
            imageUrl: data[key].imageUrl,
            tag: data[key].tag.split(","),
          });
        }
        setList(loadedList);
        setFilteredList(loadedList);
        setReload(false);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [uid, reload]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.length !== 0) {
      const newList = list.filter((item) => item.tag.includes(query));
      setFilteredList(newList);
    } else {
      setFilteredList(list);
    }
  };
  const deleteHandler = () => {
    setReload(true);
  };
  return (
    <>
      {loading && <LoadingSpinner text="Loading..." />}
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      <Form
        className="d-flex"
        style={{ width: "18rem", margin: "1rem auto 0 auto" }}
        onSubmit={searchHandler}
      >
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="outline-secondary">
          Search
        </Button>
      </Form>
      <Row style={{ padding: "1.4rem" }}>
        {fileredList.map((item) => (
          <GalleryItem key={item.id} item={item} onDelete={deleteHandler} />
        ))}
      </Row>
    </>
  );
};

export default GalleryList;
