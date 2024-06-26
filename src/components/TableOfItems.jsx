import React from "react";

const TableOfItems = ({ data, baseUrl, handleDelete, handleEdit }) => {
  return (
    <table
      style={{ whiteSpace: "nowrap" }}
      className="table table-hover table-bordered"
    >
      <thead className="text-center">
        <tr>
          <th scope="col">#</th>
          <th scope="col">№</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Old Price</th>
          <th scope="col">Category</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, id) => (
          <tr key={item.id}>
            <th className="text-center">
              <img width={100} src={baseUrl + item.image} alt="product image" />
            </th>
            <th className="text-center" scope="row">{id + 1}</th>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.price}</td>
            <td className="text-center">{item.oldPrice}</td>
            <td className="text-center">{item.category}</td>
            <td className="text-center">{item.desc.slice(0, 50)}...</td>
            <th className="text-center">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                style={{ marginLeft: 5 }}
                className="btn btn-primary"
              >
                Edit
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfItems;
