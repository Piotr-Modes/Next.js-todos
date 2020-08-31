import Loader from "./Loader";

const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return <Component {...props} />;
    return <Loader />;
  };
};

export default withLoading;
