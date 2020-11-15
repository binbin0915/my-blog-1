import React from 'react'
export default (WrappedComponent) => {
    return class withRef extends React.Component {
      render() {
        const props = {
          ...this.props,
        }
        props.ref = (el)=>{
            this.props.getRef && this.props.getRef(el);
            this.props.ref && this.props.ref(el);
        }
        return (
          <WrappedComponent {...props} />
        )
      }
    }
  }
  