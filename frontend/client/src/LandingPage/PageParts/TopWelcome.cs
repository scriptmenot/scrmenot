.TopWelcome {
  grid-area: 1/2;
  background-color: #227e5b;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  min-width: 0;
  min-height: 0;
  list-style-type: none; }
  .TopWelcome .logo {
    grid-area: 2/6/10/10;
    position: relative; }
    .TopWelcome .logo img {
      position: absolute;
      width: 85%;
      right: 10%;
      transform: translate(10%, 1%); }
  .TopWelcome .logoText {
    grid-column: 2;
    position: relative; }
    .TopWelcome .logoText h1 {
      position: absolute;
      font-size: 4.5vw;
      width: 100%;
      top: 90%;
      left: 5%;
      transform: translate(-5%, 90%); }
  .TopWelcome .titleDescription {
    grid-area: 5/2/5/5;
    position: relative; }
    .TopWelcome .titleDescription p {
      position: absolute;
      font-size: 2vw;
      color: white;
      width: 100%; }
  .TopWelcome .btn {
    grid-area: 1/10;
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid #4e987c;
    border-radius: 0.6em;
    color: white;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-weight: 550;
    height: 50%;
    border-color: #4e987c;
    color: #fff;
    border-radius: 3em;
    white-space: nowrap;
    background-image: linear-gradient(45deg, #4e987c 50%, transparent 50%);
    background-position: 100%;
    background-size: 400%;
    transition: background 400ms ease-in-out; }
    .TopWelcome .btn:hover {
      background-position: 0; }
  .TopWelcome #login {
    grid-area: 1/10;
    margin: 10px;
    padding: 0.3em 1.5em; }
  .TopWelcome #register {
    grid-area: 1/9;
    margin: 10px;
    padding: 0.3em 1.5em; }
  .TopWelcome #catalogue {
    grid-area: 1/1;
    margin-left: 20px;
    padding: 0.3em 0.3em; }

/*# sourceMappingURL=TopWelcome.cs.map */
