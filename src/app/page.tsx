const Page = () => {
  return (
    <div style={styles.container}>
      <a href="/pages" style={styles.button}>
        Logs
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f7f7f7",
  },
  button: {
    display: "inline-block",
    padding: "20px 40px",
    fontSize: "20px",
    cursor: "pointer",
    background: "#f7f7f7",
    color: "#333",
    textDecoration: "none",
    border: "2px solid #333",
    borderRadius: "5px",
    transition: "0.3s",
    "&:hover": {
      background: "#f7f7f7",
      color: "#000",
    },
  },
};

export default Page;
