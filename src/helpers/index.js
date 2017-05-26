import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

export const reduxConnect = (Component) => {
  const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat
  })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
}