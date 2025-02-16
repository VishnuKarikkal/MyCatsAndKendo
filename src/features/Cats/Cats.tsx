import "../../App.css";
import "./cats.css";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import { Typography } from "@progress/kendo-react-common";

const Cats = () => {
  return (
    <section className="main-container">
      <div className="image-grid">
        <Typography.h2 fontWeight="bold" themeColor="info" textAlign="center">
          Cat Image Generator
        </Typography.h2>
        <ImageGrid />
      </div>
    </section>
  );
};

export default Cats;
