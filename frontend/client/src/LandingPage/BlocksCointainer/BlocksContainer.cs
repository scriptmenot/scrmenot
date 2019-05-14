@import url(~slick-carousel/slick/slick.css);
@import url(~slick-carousel/slick/slick-theme.css);
.BlocksContainer {
  grid-area: 3/2/4/3;
  background-color: #F6FAF9;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 3fr 2fr 3fr 1fr;
  grid-template-rows: 1fr 4fr 4fr 1fr;
  min-width: 0;
  min-height: 0;
  list-style-type: none; }
  .BlocksContainer .AddDomainBlock {
    grid-area: 2/2/3/3;
    background-color: #fdedb3;
    position: relative;
    transition: opacity 0.4s; }
    .BlocksContainer .AddDomainBlock img {
      position: absolute;
      width: 60%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); }
  .BlocksContainer .AddDomainBlock:hover {
    cursor: pointer;
    opacity: 0.7; }
  .BlocksContainer .SearchDomainBlock {
    grid-area: 2/3/3/5;
    background-color: #4a9578;
    text-align: center; }
    .BlocksContainer .SearchDomainBlock .SearchForm {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 1s;
      width: 50px;
      height: 50px;
      background: white;
      box-sizing: border-box;
      border-radius: 25px;
      border: 4px solid white;
      padding: 5px; }
      .BlocksContainer .SearchDomainBlock .SearchForm > .Suggestions li {
        width: 0;
        overflow: hidden;
        transition: all 1s; }
      .BlocksContainer .SearchDomainBlock .SearchForm #searchInput {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 42.5px;
        line-height: 30px;
        outline: 0;
        border: 0;
        font-size: 1em;
        border-radius: 20px;
        padding: 0 20px;
        appearance: none; }
        .BlocksContainer .SearchDomainBlock .SearchForm #searchInput::-webkit-search-cancel-button {
          -webkit-appearance: none; }
      .BlocksContainer .SearchDomainBlock .SearchForm #searchButton {
        box-sizing: border-box;
        padding: 10px;
        width: 42.5px;
        height: 42.5px;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        color: #07051a;
        text-align: center;
        font-size: 1.2em;
        transition: all 1s; }
    .BlocksContainer .SearchDomainBlock .SearchForm:hover {
      width: 200px;
      cursor: pointer; }
    .BlocksContainer .SearchDomainBlock .SearchForm:hover input {
      display: block; }
    .BlocksContainer .SearchDomainBlock .SearchForm:hover #searchButton {
      background: #4a9578;
      color: white; }
    .BlocksContainer .SearchDomainBlock .Suggestions {
      position: absolute;
      top: 110%;
      list-style-type: none; }
      .BlocksContainer .SearchDomainBlock .Suggestions li {
        padding: 5%;
        background-color: white;
        width: 165px;
        transition: background-color 0.5s; }
        .BlocksContainer .SearchDomainBlock .Suggestions li:first-child {
          border-top-left-radius: 20px;
          border-top-right-radius: 20px; }
        .BlocksContainer .SearchDomainBlock .Suggestions li:last-child {
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px; }
        .BlocksContainer .SearchDomainBlock .Suggestions li:hover {
          background-color: #2c8956; }
    .BlocksContainer .SearchDomainBlock .SearchForm:hover > .Suggestions li {
      width: 165px; }
  .BlocksContainer .TopDomains {
    grid-area: 3/2/4/4;
    background-color: #2c8956;
    position: relative; }
  .BlocksContainer .BrowseCatalogueBlock {
    grid-area: 3/4/4/5;
    background-color: #c69b24;
    position: relative;
    transition: opacity 0.4s; }
    .BlocksContainer .BrowseCatalogueBlock img {
      position: absolute;
      width: 55%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); }
  .BlocksContainer .BrowseCatalogueBlock:hover {
    cursor: pointer;
    opacity: 0.7; }

/*# sourceMappingURL=BlocksContainer.cs.map */
