import React from "react";

const styles = {
    root: {
        minHeight: '80vh',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    },
    gif: {
        display: 'block'
    }
}

export default function Page404() {
  return (
    <div style={styles.root}>
      <img style={styles.gif} src="https://giphy.com/channels/id/7340" />
      <h1>Ops!! No product in cart</h1>
    </div>
  );
}
