import React, { useEffect, useState } from "react";
import ProductAdd from "./components/ProductAdd";
import Login from "./components/Login";
import TableOfItems from "./components/TableOfItems";
import EditProduct from "./components/EditProduct";

const App = () => {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggined, setIsLoggined] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const baseUrl = "https://containers-backend.onrender.com/";
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // read
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggined");

    if (savedLogin) {
      setIsLoggined(true);
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(baseUrl + "api/product/all");
        const { data } = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // delete
  const handleDelete = async (item) => {
    const areYouSure = confirm("Delete " + item.name + " from products list?");

    if (areYouSure) {
      try {
        await fetch(baseUrl + "api/product/del/" + item.id, {
          method: "DELETE",
        });

        window.location.reload();
      } catch (error) {
        console.error("There was a problem deleting the product:", error);
      }
    }
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      login.toLowerCase() == "admin" &&
      password.toLowerCase() == "container"
    ) {
      setIsLoggined(true);
      localStorage.setItem("isLoggined", true);
    } else {
      alert("Login or password is incorrect!");
      setPassword("");
      setLogin("");
    }
  };

  // onOpen edit product modal

  const onOpen = (product) => {
    setProduct(product);
    setIsOpen(true);
  };

  return (
    <div>
      {/* ADD PRODUCT */}
      <ProductAdd />
      {/* EDIT PRODUCT */}
      {isOpen && (
        <EditProduct
          product={product}
          setProduct={setProduct}
          setIsOpen={setIsOpen}
        />
      )}

      {/* LOGIN */}
      <Login
        login={login}
        password={password}
        isLoggined={isLoggined}
        onSubmit={onSubmit}
        setLogin={setLogin}
        setPassword={setPassword}
      />

      {/* ALL PRODUCTS */}
      <h1>ALL PRODUCTS</h1>

      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          marginTop: "20px",
          overflow: "auto",
        }}
      >
        {!isLoading ? (
          data.length ? (
            <TableOfItems
              data={data}
              baseUrl={baseUrl}
              handleDelete={handleDelete}
              handleEdit={(product) => onOpen(product)}
            />
          ) : (
            <h2
              style={{
                textAlign: "center",
                color: "red",
                marginTop: "30px",
              }}
            >
              NO DATA!
            </h2>
          )
        ) : (
          <h2
            style={{
              textAlign: "center",
              color: "green",
              marginTop: "30px",
            }}
          >
            LOADING...
          </h2>
        )}
      </div>
    </div>
  );
};

export default App;
