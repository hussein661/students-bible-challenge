import React from "react";
import Router from "./Routes";
import intl from "react-intl-universal";
import Axios from "axios";

class App extends React.Component {
  componentWillMount() {
    this.loadLocales();
  }

  loadLocales() {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: "lang",
      cookieLocaleKey: "lang"
    });

    const lang = localStorage.getItem("lang") === "ar" ? "ar" : "en";
    const url = `${window.location.origin}/locales/${lang}.json`;
    if (lang === "ar") {
      document.body.style.direction = "rtl";
      let ar_table = document.getElementsByClassName("ar-table")[0] || {
        style: { marginRight: "0px" }
      };
      ar_table.style.marginRight = "40px";
    }
    Axios.get(url)
      .then(res => {
        console.log(res);
        // init method will load CLDR locale data according to currentLocale
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        });
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
