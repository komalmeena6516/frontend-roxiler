import { useEffect, useState } from "react";
import axios from "axios";
import Statistics from "./Statics";
import BarChart from "./BarChart";



const Dashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectMonth, setSelectedMonth] = useState(3); //default march-03
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchTransactions = () => {
    clearTimeout(searchTimeOut);
    //debounce technique
    setSearchTimeOut(
      setTimeout(async () => {
        axios
          .get(
            `http://localhost:8001/transactions/${selectMonth}?search=${searchInput}`
          )
          .then((res) => {
            let fetchedProducts = res.data.data;
            setProducts(fetchedProducts);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500)
    );
  };
  useEffect(() => {
    fetchTransactions();
  }, [searchInput, selectMonth]);

  return (
    <div className="dashboard">
      <div className="dashboard_title">
        <h2>Transaction Dashboard</h2>
      </div>
      <div className="dashboard_searchbar">
        <input
          placeholder="search transaction"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.trim())}
        />

        <select
          value={selectMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value={1}>January</option>
          <option value={2}>Febrauary</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div className="dashboard_main">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {
                products.length>0
                ?products.map((item) => {
                    console.log(item,item.sold);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.sold.toString()}</td>
                      <td>
                        <img width={"100px"} src={item.image} />
                      </td>
                    </tr>
                  );
                })
                :<tr>
                    <td colSpan={7}>No Records Found</td>
                </tr>
            }
            {}
          </tbody>
        </table>
      </div>
      <Statistics month={selectMonth} />
      <BarChart month={selectMonth} />
    </div>
  );
};

export default Dashboard;