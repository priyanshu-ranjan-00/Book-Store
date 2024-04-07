import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-store-backend-xtau.onrender/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <div>
          <img src="./open-book.png" className="w-10" />
        </div>
        <button
          className={`bg-sky-300 hover:bg-sky-600 hover:text-white px-4 py-1 rounded-lg ${
            showType === "table" ? "border-x-2  border-black " : ""
          }`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`bg-sky-300 hover:bg-sky-600 hover:text-white px-4 py-1 rounded-lg ${
            showType === "card" ? "border-x-2  border-black" : ""
          }`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
