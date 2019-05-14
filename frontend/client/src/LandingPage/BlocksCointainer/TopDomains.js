import React from "react";
import "./BlocksContainer.scss";
import Slider from "react-slick";

class TopDomains extends React.Component {
  state = {};

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <div class="TopDomains">

      <div className="topPicture">
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PHBhdGggZD0ibTMyIDNoMjVhNCA0IDAgMCAxIDQgNHY0MGE0IDQgMCAwIDEgLTQgNGgtMjVhMCAwIDAgMCAxIDAgMHYtNDhhMCAwIDAgMCAxIDAgMHoiIGZpbGw9IiNkOWQ5ZDkiLz48cGF0aCBkPSJtMzIgN2gyNXYzNmgtMjV6IiBmaWxsPSIjNDFiZGY3Ii8+PHBhdGggZD0ibTMgNDMuMzg1IDUuNTI2LTQuMjUyYTEuNTEgMS41MSAwIDAgMCAuMDYzLTIuMzQzIDE2IDE2IDAgMCAxIC01LjU4OS0xMi4xNDl2LTMuMjU2YTE3IDE3IDAgMCAxIDEwLjUyNy0xNS43MiAxNyAxNyAwIDAgMSAxMi45NDYgMCAxNyAxNyAwIDAgMSAxMC41MjcgMTUuNzJ2My42MTVsMyA1LTUgMnYyLjRhNS4yMTEgNS4yMTEgMCAwIDEgLTIuMDgzIDQuMTY3IDUuMjExIDUuMjExIDAgMCAxIC00LjI1Ni45MTdsLTUuNzI2LTEuMjcyYTIgMiAwIDAgMCAtMS42ODMuMzlsLTIuNTA3IDEuOTk4YTIgMiAwIDAgMCAtLjE2NSAyLjk3NmwxLjc4NCAxLjc4NGE5IDkgMCAwIDEgMi42MzYgNi4zNjh2MTAuMjcyaC0yMXYtMTh6IiBmaWxsPSIjZjdiYTQxIi8+PHBhdGggZD0ibTM2LjgyNyAxOWgtMTcuODI3bDkgOCA5LTN2LTIuNjE1YTE2Ljk4MyAxNi45ODMgMCAwIDAgLS4xNzMtMi4zODV6IiBmaWxsPSIjNzg3ODc4Ii8+PHBhdGggZD0ibTMyIDUxaDlsNSA2aDExbDQgNGgtMjl6IiBmaWxsPSIjZDlkOWQ5Ii8+PHBhdGggZD0ibTU3LjA3NCAyaC0yNS4wNzR2MmgyNS4wNzRhMyAzIDAgMCAxIDMgM3Y0MGEzIDMgMCAwIDEgLTMgM2gtMjUuMDc0djJoOC42MDZsMy4zMzMgNGgtMTEuOTM5djJoMjQuNTkxbDIuMDM3IDJoLTI2LjYyOHYyaDI5LjA3NGExIDEgMCAwIDAgLjctMS43MTNsLTQuMDczLTRhMSAxIDAgMCAwIC0uNzAxLS4yODdoLTEwLjQ1OGwtMy4zMzMtNGgxMy44NjVhNS4wMDYgNS4wMDYgMCAwIDAgNS01di00MGE1LjAwNiA1LjAwNiAwIDAgMCAtNS01eiIvPjxwYXRoIGQ9Im03LjkzOCAzNy41NDlhLjUxLjUxIDAgMCAxIC0uMDIxLjc5MmwtNS41MjcgNC4yNTEgMS4yMiAxLjU4NSA1LjUyNi00LjI1MWEyLjUwOSAyLjUwOSAwIDAgMCAuMS0zLjkgMTQuOTgzIDE0Ljk4MyAwIDAgMSAtNS4yMzYtMTEuMzg1di0zLjI1NmMwLS40NjYuMDI1LS45MjcuMDY1LTEuMzg1aDE0LjU1NGw4LjcxNiA3Ljc0OGExIDEgMCAwIDAgLjk4MS4ybDcuNzYxLTIuNTg3YS45NDIuOTQyIDAgMCAwIC4wNjYuMTUzbDIuNCAzLjk5My0zLjkxMSAxLjU2M2ExIDEgMCAwIDAgLS42MzIuOTN2Mi40YTQuMjA5IDQuMjA5IDAgMCAxIC01LjEyMiA0LjFsLTUuNzI2LTEuMjcyYTIuOTgzIDIuOTgzIDAgMCAwIC0yLjUyNS41ODZsLTIuNTA2IDIuMDA1YTMgMyAwIDAgMCAtLjI0OCA0LjQ2NGwxLjc4NCAxLjc4NGE3Ljk0OCA3Ljk0OCAwIDAgMSAyLjM0MyA1LjY2MXYxMC4yNzJoMnYtMTAuMjcyYTkuOTMyIDkuOTMyIDAgMCAwIC0yLjkyOS03LjA3MWwtMS43ODQtMS43ODRhMSAxIDAgMCAxIC4wODMtMS40ODhsMi41MDYtMi4wMDZhMSAxIDAgMCAxIC44NDItLjJsNS43MjcgMS4yNzNhNi4yMDggNi4yMDggMCAwIDAgNy41NTUtNi4wNTJ2LTEuNzIzbDQuMzcyLTEuNzQ4YTEgMSAwIDAgMCAuNDg1LTEuNDQ0bC0yLjg1Ny00Ljc2MnYtMy4zMzhxMC0uNy0uMDUzLTEuMzg1aDYuMDUzdi0yaC02LjMzYTE3Ljg5MiAxNy44OTIgMCAwIDAgLTUuNjM5LTEwaDI0LjA0M3YyaC02LjA3NHYyaDYuMDc0djJoLTEuMDc0djJoMS4wNzR2NWgtNC4wNzR2Mmg0LjA3NHYyaC0xLjA3NHYyaDEuMDc0djZoLTEuMDc0djJoMS4wNzR2N2gtMjQuMDc0djJoMjUuMDc0YTEgMSAwIDAgMCAxLTF2LTM2YTEgMSAwIDAgMCAtMS0xaC0yNS4wNzR2MS45NzNhMTggMTggMCAwIDAgLTMwIDEzLjQxMnYzLjI1NmExNi45NzkgMTYuOTc5IDAgMCAwIDUuOTM4IDEyLjkwOHptMjguMDYyLTE2LjE2NHYxLjg5NGwtNy43NjggMi41OS02LjYwMi01Ljg2OWgxNC4zMDVjLjA0LjQ1OC4wNjUuOTE5LjA2NSAxLjM4NXptLTIyLjA5Mi0xNC43OTVhMTYgMTYgMCAwIDEgMjEuNzI4IDExLjQxaC0zMS4yNzJhMTUuOTM1IDE1LjkzNSAwIDAgMSA5LjU0NC0xMS40MXoiLz48cGF0aCBkPSJtMzAgMjFoMnYyaC0yeiIvPjxwYXRoIGQ9Im00MCAxMGg0djJoLTR6Ii8+PHBhdGggZD0ibTQ2IDEwaDJ2MmgtMnoiLz48cGF0aCBkPSJtNDAgMTRoMnYyaC0yeiIvPjxwYXRoIGQ9Im00NCAxNGgydjJoLTJ6Ii8+PHBhdGggZD0ibTQ4IDE0aDV2MmgtNXoiLz48cGF0aCBkPSJtNDQgMjVoMnYyaC0yeiIvPjxwYXRoIGQ9Im00OCAyNWg1djJoLTV6Ii8+PHBhdGggZD0ibTQ0IDI5aDd2MmgtN3oiLz48cGF0aCBkPSJtNDQgMzNoNHYyaC00eiIvPjxwYXRoIGQ9Im01MCAzM2gzdjJoLTN6Ii8+PHBhdGggZD0ibTUzIDI5aDJ2MmgtMnoiLz48cGF0aCBkPSJtNDQgMjFoMnYyaC0yeiIvPjxwYXRoIGQ9Im00OCAyMWgydjJoLTJ6Ii8+PC9zdmc+Cg==" alt="topPicture"/>
      </div>

        <div class="slider">
          <h2 className="topTitle"> Top 5 domains:</h2>
          <Slider {...settings}>
            <div>
              <h3 className="topType">Dangerous:</h3>
              <ul>
                <li>Domena 1</li>
                <li>Domena 2</li>
                <li>Domena 3</li>
                <li>Domena 4</li>
                <li>Domena 5</li>
              </ul>
            </div>
            <div>
              <h3 className="topType">Safe:</h3>
              <ul>
                <li>Domena 1</li>
                <li>Domena 2</li>
                <li>Domena 3</li>
                <li>Domena 4</li>
                <li>Domena 5</li>
              </ul>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default TopDomains;
