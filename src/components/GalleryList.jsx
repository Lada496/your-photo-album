import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Row, Form, FormControl, Button } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import GalleryItem from "./GalleryItem";
import LoadingSpinner from "./UI/LoadingSpinner";
import { AuthContext } from "../store/auth-context";
import Message from "./UI/Message";

const GalleryList = () => {
  const message = "No Item uploaded";
  const [init, setInit] = useState(true);
  const [query, setQuery] = useState("");
  const { uid, accessToken } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [fileredList, setFilteredList] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://your-photo-album-default-rtdb.firebaseio.com/images/${uid}.json?auth=${accessToken}`
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
      .catch((error) => setError("⚠ Data fetch failed"))
      .finally(() => {
        setInit(false);
        setLoading(false);
      });
  }, [uid, reload, accessToken]);

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
        <Button type="submit" variant="secondary">
          <FiSearch style={{ fontSize: "1.3rem" }} />
        </Button>
      </Form>
      <Row style={{ padding: "1.4rem" }}>
        {fileredList.length !== 0 &&
          fileredList.map((item) => (
            <GalleryItem key={item.id} item={item} onDelete={deleteHandler} />
          ))}
        {!init && !error && fileredList.length === 0 && (
          <Message text={message} />
        )}
        {error && <Message text={error} />}
      </Row>
    </>
  );
};

export default GalleryList;
