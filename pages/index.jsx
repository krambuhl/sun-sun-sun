import React from 'react'
import Router, { withRouter } from 'next/router'
import _ from 'lodash'

class Index extends React.Component {
  constructor (props) {
    super(props)
    const { query } = props.router
    this.state = {
      width: query.width || 50,
      length: query.length || 235,
      intersect: query.intersect || 120,
      offset: query.offset || -45,
      size: query.size || 8
    }

    this.updateRouter = _.debounce(() => {
      Router.push({
        pathname: '/',
        query: this.state
      });
    }, 100);
  }

  update (name, value) {
    this.updateRouter();
    this.setState({
      [name]: value
    });
  }

  renderControls () {
    const { width, length, intersect, offset, size } = this.state

    return (
      <div className="root">
        <label htmlFor="width">Width</label>
        <input
          id="width"
          type="range"
          min="1"
          value={width}
          onChange={ev =>this.update('width', ev.target.value)}
        />
        <span>{width}</span>
        <br />

        <label htmlFor="length">Length</label>
        <input
          id="length"
          type="range"
          value={length}
          min="100"
          max="1000"
          onChange={ev =>this.update('length', ev.target.value)}
        />
        <span>{length}</span>
        <br />

        <label htmlFor="intersect">Intersect</label>
        <input
          id="intersect"
          type="range"
          value={intersect}
          min="1"
          max="1000"
          onChange={ev =>this.update('intersect', ev.target.value)}
        />
        <span>{intersect}</span>
        <br />

        <label htmlFor="offset">offset</label>
        <input
          id="offset"
          type="range"
          value={offset}
          min="-200"
          max="200"
          onChange={ev =>this.update('offset', ev.target.value)}
        />
        <span>{offset}</span>
        <br />

        <label htmlFor="size">Count</label>
        <input
          id="size"
          type="range"
          value={size}
          min="1"
          max="100"
          onChange={ev =>this.update('size', ev.target.value)}
        />
        <span>{size}</span>

        <style jsx>{`
          .root {
            position: relative;
            z-index: 100;
          }
        `}</style>
      </div>
    )
  }

  renderGraphic () {
    const { width, length, intersect, size, offset } = this.state

    return (
      <div className="root">
        <div className="container">
          {
            Array.from({ length: size })
              .map((_, i) => {
                const style = { // (360 / size)
                  transform: `
                    rotate(${i * (360 / size)}deg)
                    translate3d(${offset}px, 0, 0)
                    translate3d(0, -${intersect}px, 0)
                  `
                }

                return <div key={i} style={style} className="bar" />
              })
          }
        </div>


        <style jsx>{`
          .bar {
            height: ${width}px;
            width: ${length}px;
          }
        `}</style>

        <style jsx>{`
          .root {
            display: flex;
            height: 80vh;
            align-content: center;
            justify-content: center;
          }

          .container {
            position: relative;
            width: 100%;
          }

          .bar {
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: black;
            transform-origin: top left;
          }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderControls()}
        {this.renderGraphic()}
      </div>
    )
  }
}

export default withRouter(Index)
