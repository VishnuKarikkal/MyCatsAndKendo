import { Button, Chip } from "@progress/kendo-react-buttons";
import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  GridLayout,
  GridLayoutItem,
  CardFooter,
  CardHeader,
} from "@progress/kendo-react-layout";

import "./imageGrid.css";
import rightArrow from "../../assets/arrow-right.png";
import leftArrow from "../../assets/left-arrows.png";
import useCats from "../../features/Cats/service/useCats";

import { useEffect, useState } from "react";

import { Switch } from "@progress/kendo-react-inputs";
import { hyperlinkOpenIcon } from "@progress/kendo-svg-icons";
import { Typography } from "@progress/kendo-react-common";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Skeleton } from "@progress/kendo-react-indicators";

import { useAppStore } from "../../store/store";

const ImageGrid = () => {
  const catsData = useAppStore((state) => state.catsData);

  const [pageNo, setPageNo] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [balineseOnly, setBalineseOnly] = useState<boolean>(false);
  const [abyssinianOnly, setAbyssinianOnly] = useState<boolean>(false);
  const [aegeanOnly, setAegeanOnly] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);

  const { getCatsData } = useCats();

  const initialize = () => {
    setPageNo(0);
    setLimit(5);
  };

  const handleToggle = (id: number) => {
    if (id == 1) {
      setBalineseOnly(!balineseOnly);
      setAbyssinianOnly(false);
      setAegeanOnly(false);
    } else if (id == 2) {
      setBalineseOnly(false);
      setAbyssinianOnly(!abyssinianOnly);
      setAegeanOnly(false);
    } else {
      setBalineseOnly(false);
      setAbyssinianOnly(false);
      setAegeanOnly(!aegeanOnly);
    }
  };

  const navigatePages = (action: number) => {
    if (action == 1) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    } else {
      if (pageNo != 0) setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };

  const autoCloseAlerts = () => {
    setTimeout(() => {
      setSuccessNotification(false);
      setErrorNotification(false);
    }, 1600);
  };

  const getBreedId = () => {
    if (balineseOnly) return "bali";
    if (abyssinianOnly) return "abys";
    if (aegeanOnly) return "aege";
  };

  const fetchCats = () => {
    let breedId = getBreedId() ?? "";

    setLoading(true);

    getCatsData({
      limit: limit,
      pageNo: pageNo,
      breedId,
    })
      .then(() => {
        setSuccessNotification(true);
      })
      .catch(() => {
        setErrorNotification(true);
      })
      .finally(() => {
        autoCloseAlerts();
        setLoading(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    initialize();

    fetchCats();

    return () => {
      initialize();
      controller.abort();
    };
  }, [balineseOnly, abyssinianOnly, aegeanOnly]);

  useEffect(() => {
    fetchCats();
  }, [pageNo]);

  return (
    <>
      <>
        <GridLayout
          rows={[{ height: 450 }, { height: 100 }]}
          cols={[
            { width: 250 },
            { width: 250 },
            { width: 250 },
            { width: 250 },
            { width: 250 },
          ]}
          gap={{ rows: 2, cols: 2 }}
          align={{ horizontal: "stretch", vertical: "stretch" }}
        >
          {loading
            ? [0, 1, 2, 3, 4].map((id) => (
                <GridLayoutItem row={1} col={id + 1} className="box">
                  <Card style={{ width: 450, height: 450 }}>
                    <CardHeader className="k-hbox">
                      <Skeleton shape={"text"} style={{ width: "40%" }} />
                    </CardHeader>

                    <Skeleton
                      shape={"rectangle"}
                      style={{ width: "100%", height: 300 }}
                    />
                    <CardFooter>
                      <Skeleton shape={"text"} style={{ width: "100%" }} />
                    </CardFooter>
                  </Card>
                </GridLayoutItem>
              ))
            : catsData.map((cat, index) => (
                <GridLayoutItem row={1} col={index + 1} className="box">
                  <Card style={{ width: 450, height: 450 }}>
                    <CardBody>
                      <CardTitle>{cat.breeds[0].name}</CardTitle>

                      <CardImage
                        className="catImg"
                        style={{ height: 300 }}
                        src={cat.url}
                      ></CardImage>
                      {/* <CardSubtitle>{cat.breeds[0].description}</CardSubtitle> */}
                    </CardBody>

                    <CardFooter>
                      <Button
                        svgIcon={hyperlinkOpenIcon}
                        type="button"
                        fillMode={"link"}
                        onClick={() => window.open(cat.breeds[0].wikipedia_url)}
                      >
                        Wikipedia🚩
                      </Button>
                    </CardFooter>
                  </Card>
                </GridLayoutItem>
              ))}

          <GridLayoutItem
            row={2}
            col={1}
            className="box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.h6 fontWeight="bold">
              Balinese only{" "}
              <Switch
                size={"large"}
                checked={balineseOnly}
                onLabel={"On"}
                offLabel={"Off"}
                onChange={() => handleToggle(1)}
              />
            </Typography.h6>
          </GridLayoutItem>
          <GridLayoutItem
            row={2}
            col={2}
            className="box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.h6 fontWeight="bold">
              Abyssinian only{" "}
              <Switch
                size={"large"}
                checked={abyssinianOnly}
                onLabel={"On"}
                offLabel={"Off"}
                onChange={() => handleToggle(2)}
              />
            </Typography.h6>
          </GridLayoutItem>
          <GridLayoutItem
            row={2}
            col={3}
            className="box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.h6 fontWeight="bold">
              Aegean only{" "}
              <Switch
                size={"large"}
                checked={aegeanOnly}
                onLabel={"On"}
                offLabel={"Off"}
                onChange={() => handleToggle(3)}
              />
            </Typography.h6>
          </GridLayoutItem>
          {!abyssinianOnly && !balineseOnly && !aegeanOnly && (
            <GridLayoutItem row={2} col={4} className="box">
              <Chip
                text={"Random"}
                selected={true}
                fillMode={"outline"}
                themeColor={"success"}
                size={"large"}
                style={{ cursor: "none" }}
              />
            </GridLayoutItem>
          )}
          <GridLayoutItem
            row={2}
            col={5}
            className="box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                imageUrl={leftArrow}
                imageAlt={"prev-page"}
                title={"Previous Page"}
                disabled={pageNo == 0}
                className="navBtn"
                style={{ margin: "auto 10px", marginRight: "10px" }}
                onClick={() => navigatePages(-1)}
              ></Button>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography.h6 fontWeight="bold" themeColor="info">
                  Page {pageNo + 1}
                </Typography.h6>
              </span>

              <Button
                imageUrl={rightArrow}
                imageAlt={"next-page"}
                title={"Next Page"}
                disabled={false}
                className={"navBtn"}
                style={{
                  margin: "auto 10px",
                  marginLeft: "10px",
                }}
                onClick={() => navigatePages(1)}
              />
            </div>
          </GridLayoutItem>
        </GridLayout>

        <NotificationGroup
          style={{
            right: 0,
            top: 0,
            alignItems: "flex-start",
            flexWrap: "wrap-reverse",
          }}
        >
          {successNotification && (
            <Notification
              type={{ style: "success", icon: true }}
              closable={true}
              onClose={() => setSuccessNotification(false)}
            >
              <span>Successfully Fetched Data!</span>
            </Notification>
          )}
          {errorNotification && (
            <Notification
              type={{ style: "error", icon: true }}
              closable={true}
              onClose={() => setErrorNotification(false)}
            >
              <span>Something went wrong!</span>
            </Notification>
          )}
        </NotificationGroup>
      </>
    </>
  );
};

export default ImageGrid;
