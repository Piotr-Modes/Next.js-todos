import { Heading } from "rebass";

const PageHeader = ({ headerText }) => {
  return (
    <Heading variant="display" textAlign="center">
      {headerText}
    </Heading>
  );
};

export default PageHeader;
