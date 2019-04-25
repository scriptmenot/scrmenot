import React from 'react';
import './Description.scss';

class DescriptionBrowse extends React.Component {
  render() {
    return (
      <div className="DescriptionBrowse">

        <div className="textDescrition">
          <p className="title"><b>If you want to be save</b></p>
          <p className="description">... check this out</p>
        </div>

        <div className="descriptionImage">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIC05IDUxMiA1MTIiIHdpZHRoPSI1MTJweCI+PHBhdGggZD0ibTQ3NS44MDg1OTQgMzkwLjQyNTc4MWgtNDQwLjA1MDc4MmMtMTQuMzQ3NjU2IDAtMjUuOTc2NTYyLTExLjYyODkwNi0yNS45NzY1NjItMjUuOTcyNjU2di0zMjguNDcyNjU2YzAtMTQuMzQzNzUgMTEuNjI4OTA2LTI1Ljk3MjY1NyAyNS45NzY1NjItMjUuOTcyNjU3aDQ0MC4wNTA3ODJjMTQuMzQzNzUgMCAyNS45NzI2NTYgMTEuNjI4OTA3IDI1Ljk3MjY1NiAyNS45NzI2NTd2MzI4LjQ2ODc1YzAgMTQuMzQ3NjU2LTExLjYyODkwNiAyNS45NzY1NjItMjUuOTcyNjU2IDI1Ljk3NjU2MnptMCAwIiBmaWxsPSIjZTFmNGZkIi8+PHBhdGggZD0ibTU1LjkzMzU5NCA1NS44MjQyMTloMzk5LjY5NTMxMnYyNjMuMjUzOTA2aC0zOTkuNjk1MzEyem0wIDAiIGZpbGw9IiM1N2M3ZmYiLz48cGF0aCBkPSJtMTY0LjUwMzkwNiAzMTkuMDc0MjE5aDMzNy4yNzczNDR2NDUuMzgyODEyYzAgMTQuMzM5ODQ0LTExLjYyODkwNiAyNS45Njg3NS0yNS45Njg3NSAyNS45Njg3NWgtNDQwLjA1ODU5NGMtMTQuMzQzNzUgMC0yNS45NzI2NTYtMTEuNjI4OTA2LTI1Ljk3MjY1Ni0yNS45Njg3NXYtNDUuMzgyODEyem0wIDAiIGZpbGw9IiM3ODc4NzgiLz48cGF0aCBkPSJtMjk5Ljk2MDkzOCAzOTAuNDI1NzgxaC04OC4zNTU0NjlsLTE4LjEwMTU2MyA5NC4wODU5MzhoMTI0LjU1NDY4OHptMCAwIiBmaWxsPSIjZTFmNGZkIi8+PHBhdGggZD0ibTI0MC41MDM5MDYgMTA5LjczODI4MS03OS4zMDA3ODEgMTM3LjM0NzY1N2MtNy4xNjAxNTYgMTIuNDA2MjUgMS43OTI5NjkgMjcuOTEwMTU2IDE2LjExNzE4NyAyNy45MTAxNTZoMTU4LjU5Mzc1YzE0LjMyNDIxOSAwIDIzLjI3NzM0NC0xNS41MDM5MDYgMTYuMTE3MTg4LTI3LjkxMDE1NmwtNzkuMzAwNzgxLTEzNy4zNDc2NTdjLTcuMTYwMTU3LTEyLjQwMjM0My0yNS4wNjY0MDctMTIuNDAyMzQzLTMyLjIyNjU2MyAwem0wIDAiIGZpbGw9IiNmY2RkNmQiLz48cGF0aCBkPSJtNDc2LjAyNzM0NCAwaC00NDAuMDU0Njg4Yy0xOS44MzU5MzcgMC0zNS45NzI2NTYgMTYuMTM2NzE5LTM1Ljk3MjY1NiAzNS45NzI2NTZ2MzI4LjQ3MjY1NmMwIDE5LjgzNTkzOCAxNi4xMzY3MTkgMzUuOTcyNjU3IDM1Ljk2ODc1IDM1Ljk3MjY1N2gxNjMuNzQ2MDk0bC0xNC4yNSA3NC4wODIwMzFoLTQ0LjI4MTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYyLTEwIDEwczQuNDc2NTYyIDEwIDEwIDEwaDIyOS42MzI4MTJjNS41MjM0MzggMCAxMC00LjQ3NjU2MiAxMC0xMHMtNC40NzY1NjItMTAtMTAtMTBoLTQ0LjI3NzM0NGwtMTQuMjUzOTA2LTc0LjA4MjAzMWgxNjMuNzQ2MDk0YzE5LjgzMjAzMSAwIDM1Ljk2ODc1LTE2LjEzNjcxOSAzNS45Njg3NS0zNS45NzI2NTd2LTMyOC40NzI2NTZjMC0xOS44MzU5MzctMTYuMTM2NzE5LTM1Ljk3MjY1Ni0zNS45NzI2NTYtMzUuOTcyNjU2em0tNDQwLjA1NDY4OCAyMGg0NDAuMDU0Njg4YzguODA4NTk0IDAgMTUuOTcyNjU2IDcuMTY0MDYyIDE1Ljk3MjY1NiAxNS45NzI2NTZ2MjczLjA5Mzc1aC0yNi4xNTIzNDR2LTI1My4yNWMwLTUuNTIzNDM3LTQuNDc2NTYyLTEwLTEwLTEwaC0zOTkuNjk1MzEyYy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjI1My4yNWgtMjYuMTUyMzQ0di0yNzMuMDkzNzVjMC04LjgwODU5NCA3LjE2NDA2Mi0xNS45NzI2NTYgMTUuOTcyNjU2LTE1Ljk3MjY1NnptNDU2LjAyNzM0NCAzNDQuNDQxNDA2YzAgOC44MDg1OTQtNy4xNjQwNjIgMTUuOTc2NTYzLTE1Ljk3MjY1NiAxNS45NzY1NjNoLTQ0MC4wNTQ2ODhjLTguODA4NTk0IDAtMTUuOTcyNjU2LTcuMTY3OTY5LTE1Ljk3MjY1Ni0xNS45NzY1NjN2LTM1LjM3NWgzNi4xMTMyODFjLjAxNTYyNSAwIC4wMjczNDQuMDAzOTA2LjAzOTA2My4wMDM5MDYuMDE1NjI1IDAgLjAyNzM0NC0uMDAzOTA2LjAzOTA2Mi0uMDAzOTA2aDI4LjI0NjA5NGM1LjUyMzQzOCAwIDEwLTQuNDc2NTYyIDEwLTEwIDAtNS41MTk1MzEtNC40NzY1NjItMTAtMTAtMTBoLTE4LjI4NTE1NnYtMjQzLjI1aDM3OS42OTUzMTJ2MjQzLjI1aC0yODEuMTI1Yy01LjUyMzQzNyAwLTEwIDQuNDc2NTYzLTEwIDEwIDAgNS41MjM0MzggNC40NzY1NjMgMTAgMTAgMTBoMjkxLjA4NTkzOGMuMDExNzE4IDAgLjAyNzM0NC4wMDM5MDYuMDM5MDYyLjAwMzkwNi4wMTE3MTkgMCAuMDIzNDM4LS4wMDM5MDYuMDM5MDYzLS4wMDM5MDZoMzYuMTEzMjgxem0tMTg1LjgyODEyNSAxMTAuMDYyNWgtMTAwLjM0Mzc1bDE0LjI1MzkwNi03NC4wODU5MzdoNzEuODM1OTM4em0wIDAiLz48cGF0aCBkPSJtMTM0LjA4OTg0NCAzMTUuMjQyMTg4Yy0xLjYwMTU2My0zLjg0NzY1Ny01LjU2MjUtNi4zODI4MTMtOS43MzQzNzUtNi4xNTYyNS00LjA1MDc4MS4yMjI2NTYtNy42NjQwNjMgMi45MTc5NjgtOC45NjQ4NDQgNi43Njk1MzEtMS4zMzU5MzcgMy45NDUzMTItLjAzNTE1NiA4LjQ1NzAzMSAzLjI0NjA5NCAxMS4wNDI5NjkgMy4yODUxNTYgMi41OTM3NSA3LjkyOTY4NyAyLjg1OTM3NCAxMS40OTIxODcuNjYwMTU2IDQuMTIxMDk0LTIuNTUwNzgyIDUuNzkyOTY5LTcuODQ3NjU2IDMuOTYwOTM4LTEyLjMxNjQwNnptMCAwIi8+PHBhdGggZD0ibTE3Ny41MzkwNjIgMjg0Ljk4ODI4MWgxNTguNTk3NjU3YzEwLjMzOTg0MyAwIDE5LjYwMTU2Mi01LjM0Mzc1IDI0Ljc3MzQzNy0xNC4zMDA3ODEgNS4xNjc5NjktOC45NTcwMzEgNS4xNjc5NjktMTkuNjUyMzQ0IDAtMjguNjA5Mzc1bC03OS4zMDA3ODEtMTM3LjM0NzY1NmMtNS4xNjc5NjktOC45NTcwMzEtMTQuNDI5Njg3LTE0LjMwNDY4OC0yNC43NzM0MzctMTQuMzA0Njg4LTEwLjMzOTg0NCAwLTE5LjYwNTQ2OSA1LjM0NzY1Ny0yNC43NzM0MzggMTQuMzA0Njg4bC03OS4yOTY4NzUgMTM3LjM0NzY1NmMtNS4xNzE4NzUgOC45NTcwMzEtNS4xNzE4NzUgMTkuNjUyMzQ0IDAgMjguNjA5Mzc1IDUuMTY3OTY5IDguOTU3MDMxIDE0LjQyOTY4NyAxNC4zMDA3ODEgMjQuNzczNDM3IDE0LjMwMDc4MXptLTcuNDU3MDMxLTMyLjkxMDE1NiA3OS4zMDA3ODEtMTM3LjM0NzY1NmMyLjI0MjE4OC0zLjg4MjgxMyA1Ljk1NzAzMi00LjMwNDY4OCA3LjQ1MzEyNi00LjMwNDY4OCAxLjQ5MjE4NyAwIDUuMjEwOTM3LjQxNzk2OSA3LjQ1MzEyNCA0LjMwNDY4OGw3OS4zMDA3ODIgMTM3LjM0NzY1NmMyLjI0MjE4NyAzLjg4NjcxOS43NDYwOTQgNy4zMTI1IDAgOC42MDkzNzUtLjc0NjA5NCAxLjI5Mjk2OS0yLjk2ODc1IDQuMzAwNzgxLTcuNDUzMTI1IDQuMzAwNzgxaC0xNTguNTk3NjU3Yy00LjQ4NDM3NCAwLTYuNzA3MDMxLTMuMDA3ODEyLTcuNDUzMTI0LTQuMzAwNzgxLS43NS0xLjI5Njg3NS0yLjI0NjA5NC00LjcyMjY1Ni0uMDAzOTA3LTguNjA5Mzc1em0wIDAiLz48cGF0aCBkPSJtMjU2LjM3ODkwNiAyMTUuODM5ODQ0YzUuNTIzNDM4IDAgMTAtNC40NzY1NjMgMTAtMTB2LTU1LjY4MzU5NGMwLTUuNTE5NTMxLTQuNDc2NTYyLTEwLTEwLTEwLTUuNTIzNDM3IDAtMTAgNC40ODA0NjktMTAgMTB2NTUuNjgzNTk0YzAgNS41MjM0MzcgNC40NzY1NjMgMTAgMTAgMTB6bTAgMCIvPjxwYXRoIGQ9Im0yNTYuODM1OTM4IDIyNy4zODI4MTJjLTUuNTIzNDM4IDAtMTAgNC40NzY1NjMtMTAgMTB2OC4xMzY3MTljMCA1LjUyMzQzOCA0LjQ3NjU2MiAxMCAxMCAxMCA1LjUyMzQzNyAwIDEwLTQuNDc2NTYyIDEwLTEwdi04LjEzNjcxOWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiLz48L3N2Zz4K" alt="screen"/>
        </div>
      </div>
    )
  }
}

export default DescriptionBrowse;