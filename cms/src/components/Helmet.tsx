import { Helmet as HelmetWrapper } from "react-helmet";

function Helmet(props: HelmetProps) {
  return (
    <HelmetWrapper>
      <title>Khách sạn thanh sơn | {props.title}</title>
      <meta name="description" content={props.description} />
    </HelmetWrapper>
  );
}

Helmet.defaultProps = {
  title: "Khách sạn thanh sơn",
  description: "",
};

export default Helmet;
