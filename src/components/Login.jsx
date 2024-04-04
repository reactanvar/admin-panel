import React from "react";

const Login = ({
  onSubmit,
  isLoggined,
  login,
  password,
  setLogin,
  setPassword,
}) => {
  return (
    !isLoggined && (
      <form
        onSubmit={onSubmit}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>ENTER LOGIN AND PASSWORD!</h3>

        <input
          className="form-control"
          style={{ padding: 10, margin: "10px 0", maxWidth: 300 }}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="LOGIN"
        />
        <input
          className="form-control"
          style={{ padding: 10, margin: "10px 0", maxWidth: 300 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="PAROL"
        />
        <button
          className="btn btn-primary btn-lg"
          style={{ padding: 10, cursor: "pointer" }}
          type="submit"
        >
          Kiritish
        </button>
      </form>
    )
  );
};

export default Login;
