import { Helmet as HelmetWrapper } from "react-helmet";

function Helmet(props: HelmetProps) {
  return (
    <HelmetWrapper>
      <title>Eat Clean | {props.title}</title>
      <meta name="description" content={props.description} />
    </HelmetWrapper>
  );
}

Helmet.defaultProps = {
  title: "Eat Clean",
  description: "",
};

export default Helmet;
