import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { findings, membersArray } from "./utilityFile";
import { Typography } from "@progress/kendo-react-common";
import { useEffect } from "react";

const More = () => {
  let results = findings;

  useEffect(() => {
    console.log("members array", membersArray);

    console.log("Billed Members", results.billedMembers);

    console.log("Circles found", results.groupsInfo);
  }, []);
  return (
    <>
      <GridLayout
        rows={[{ height: 500 }]}
        cols={[{ width: "auto" }]}
        gap={{ rows: 2, cols: 2 }}
        align={{ horizontal: "stretch", vertical: "stretch" }}
      >
        <GridLayoutItem
          row={1}
          col={1}
          className="box"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography.pre fontWeight="bold" themeColor="dark">
            Part 2 - Member Problem Solution in Console Logs.. (Code available
            at "utilityFile.ts")
          </Typography.pre>
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default More;
