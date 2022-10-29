import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { auth, db } from "../firebase/Firebase";

export const Crypto = createContext({
  user: null,
  loading: false,
  coins: [],
  fetchCoins: () => {},
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  setAlert: () => {},
  watchlist: [],
});

export const CryptoContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList("inr"));
    setCoins(data);
    setloading(false);
    return data;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unSub = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        }
      });
      return () => unSub();
    }
  }, [user]);

  return (
    <Crypto.Provider
      value={{ user, coins, loading, fetchCoins, alert, setAlert, watchlist }}
    >
      {children}
    </Crypto.Provider>
  );
};
