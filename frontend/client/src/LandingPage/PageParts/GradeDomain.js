import React from "react";
import "./GradeDomain.scss";
import CountUp, { startAnimation } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const style = {
  componentName: {},
  countup: {}
};

class GradeDomain extends React.Component {
  state = {
    didViewCountUp: false
  };

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ didViewCountUp: true });
    }
  };

  render() {
    return (
      <div className="GradeDomain">
        <div className="CountUpOne">
          <div className="GrowOne">
            <VisibilitySensor
              onChange={this.onVisibilityChange}
              offset={{
                top: 10
              }}
              delayedCall
            >
              <CountUp
                className={style.countup}
                start={0}
                end={this.state.didViewCountUp ? 178 : 0}
                duration={4}
              />
            </VisibilitySensor>
            <p className="title1">Added domains</p>
          </div>
        </div>

        <div className="CountUpTwo">
          <div className="GrowTwo">
          <VisibilitySensor
              onChange={this.onVisibilityChange}
              offset={{
                top: 10
              }}
              delayedCall
            >
              <CountUp
                className={style.countup}
                start={0}
                end={this.state.didViewCountUp ? 567 : 0}
                duration={7}
              />
            </VisibilitySensor>
            <p className="title1">Satisfied users</p>
          </div>
        </div>

        <div className="CountUpThree">
          <div className="GrowThree">
          <VisibilitySensor
              onChange={this.onVisibilityChange}
              offset={{
                top: 10
              }}
              delayedCall
            >
              <CountUp
                className={style.countup}
                start={0}
                end={this.state.didViewCountUp ? 5066 : 0}
                duration={8}
              />
            </VisibilitySensor>
            <p className="title1">Comments added</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GradeDomain;

/*
render() {
      return (
          <div className="GradeDomain">
            <div className="CountUpOne">
              <div className="GrowOne">
              <CountUp end={150} duration={5}>

              </CountUp>
              <p className="title1">Added domains</p>
              </div>
            
            </div>

            <div className="CountUpTwo">
            <div className="GrowTwo">
              <CountUp end={591} duration={7}>

              </CountUp>
              <p className="title1">Satisfied users</p>
              </div>
            </div>

            <div className="CountUpThree">
            <div className="GrowThree">
              <CountUp end={10001} duration={9}>

              </CountUp>
              <p className="title1">Comments added</p>
              </div>
            </div>
          </div>
      )
    }
*/
