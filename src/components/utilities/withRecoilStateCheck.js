const withRecoilStateCheck = (Component) => {
  return ({ isRecoilStateReady, initialState, recoilState, ...props }) => {
    if (isRecoilStateReady) return <Component list={recoilState} {...props} />
    return <Component list={initialState} {...props} />
  }
}

export default withRecoilStateCheck
