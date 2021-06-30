import React, { useEffect, useState, useRef } from "react";
import Layout from "./layout";
import Header from "./header";
import Navbar from "./navbar";
import SplitPane, {
  Divider,
  SplitPaneLeft,
  SplitPaneRight,
} from "./split-pane";
import Footer from "./footer";
import CheckboxTree from "react-checkbox-tree";
import { nodes } from "../data/handbook";
import { navigate } from "gatsby";
import SearchResults from "./search-results";
import { useStaticQuery, graphql } from "gatsby";

const PageWrapper = (props) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [expand, setExpand] = useState("");
  const [page, setPage] = useState({});
  const [value, setValue] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [results, setResults] = useState([]);
  const [printResults, setPrintResults] = useState("");
  const [index, setIndex] = useState("");
  const [store, setStore] = useState({});
  const [handleSubmitToggle, setHandleSubmitToggle] = useState(0);
  const prevClass = useRef();
  const toggleRef = useRef();
  let allNodes = Object.values(nodes);
  let buffer = "";

  const data = useStaticQuery(graphql`
    query {
      localSearchPages {
        publicIndexURL
        publicStoreURL
      }
    }
  `);

  // const store = Object.values(data.localSearchPages.store);
  const handlePageLoad = (slug) => {
    let url = slug ? slug.split("/") : window.location.href.split("/");
    if (url[url.length - 1] === "") {
      url.pop();
    }

    // Taking care of links with # links
    if (url[url.length - 1].includes("#")) {
      let last = url.pop().split("#")[0];
      if (last.length !== 0) url.push(last);
    }
    let currentExpanded =
      url.indexOf("pages") !== -1
        ? url.slice(url.indexOf("pages") + 1, url.length - 1)
        : [];
    let arr = [];
    let len = currentExpanded.length;
    let currentPage = {};

    if (currentExpanded.length !== 0) {
      // Build array of expanded nodes
      for (var i = 0; i < len; i++) {
        arr.splice(0, 0, currentExpanded.join("/"));
        currentExpanded = currentExpanded.slice(0, currentExpanded.length - 1);
      }

      // Find the selected page's parent in the nodes object
      for (var j = 0; j < arr.length - 1; j++) {
        var allNodesFound = allNodes.find(
          (element) => element.value === arr[j]
        );
        if (allNodesFound) {
          allNodes = allNodesFound.children;
        }
      }

      currentPage.parent = allNodes.find(
        (element) => element.value === arr[len - 1]
      );
    } else {
      currentPage.parent = [];
    }
    currentPage.value = url
      .slice(url.indexOf("pages") + 1, url.length)
      .join("/");

    setValue(currentPage.value);
    setExpanded(arr);
    setPage(currentPage);
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  useEffect(() => {
    fetch(data.localSearchPages.publicIndexURL)
      .then((result) => result.text())
      .then((res) => {
        setIndex(res);
      });
    fetch(data.localSearchPages.publicStoreURL)
      .then((result) => result.json())
      .then((res) => {
        setStore(res);
      });
  }, []);

  useEffect(() => {
    prevClass.current = currentClass;
  }, [currentClass]);

  useEffect(() => {
    if (value !== "" && value !== "/") {
      handleClick(value);
    } else if (value === "/") {
      handleHighlight(value);
    }
  }, [value]);

  useEffect(() => {
    if (expand.length > 0) {
      handlePageLoad(expand);
    }
  }, [expand]);

  useEffect(() => {
    toggleRef.current = handleSubmitToggle;
  }, [handleSubmitToggle]);

  const handleClick = (value) => {
    let names = value.split("/");
    let className = names[names.length - 1];
    handleHighlight(className);
  };

  const handleHighlight = (className) => {
    if (
      prevClass.current !== "" &&
      prevClass.current !== undefined &&
      document.getElementsByClassName(prevClass.current)[0] !== undefined
    ) {
      document
        .getElementsByClassName(prevClass.current)[0]
        .children[0].children[2].classList.remove("active");
    }
    if (document.getElementsByClassName(className)[0] !== undefined) {
      document
        .getElementsByClassName(className)[0]
        .children[0].children[2].classList.add("active");
    }

    if (className === "/") {
      setCurrentClass("");
      setExpanded([]);
      setPage({});
    } else {
      setCurrentClass(className);
    }
  };

  const handleChecked = (checked) => {
    for (let i = 0; i < checked.length; i++) {
      let ele = Object.values(store)
        .map((obj) => {
          return obj.slug;
        })
        .indexOf(`/pages/${checked[i]}`);
      buffer = buffer.concat(
        `<br><h2>${Object.values(store)[ele].title}</h2>`,
        Object.values(store)[ele].html
      );
    }
    setPrintResults(buffer);
  };

  return (
    <Layout title={props.data?.markdownRemark?.frontmatter.title}>
      <div className="App">
        <Header />
        <Navbar
          page={page}
          value={value === "" ? page.value : value}
          valueCallback={(value) => {
            setValue(value);
          }}
          // localSearchPages={data.localSearchPages}
          index={index}
          store={store}
          setResults={setResults}
          handleSubmitToggle={handleSubmitToggle}
          setHandleSubmitToggle={setHandleSubmitToggle}
          printResults={printResults}
        />
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <CheckboxTree
              nodes={nodes}
              checkModel="all"
              checked={checked}
              expanded={expanded}
              expandOnClick
              showNodeIcon={false}
              onCheck={(checked) => {
                setChecked(checked);
                handleChecked(checked);
              }}
              onExpand={(expanded) => setExpanded(expanded)}
              onClick={(targetNode) => {
                navigate(`/pages/${targetNode.value}`);
                setPage(targetNode);
                setValue("");
                setExpand("");
                handleClick(targetNode.value);
                if (results.length > 0) {
                  setResults([]);
                }
              }}
            />
          </SplitPaneLeft>
          <Divider className="separator-col" />
          <SplitPaneRight>
            {toggleRef.current === handleSubmitToggle ? (
              props.children
            ) : (
              <SearchResults
                results={results}
                setResults={setResults}
                valueCallback={(value) => {
                  setValue(value);
                }}
                expandCallback={(expand) => {
                  setExpand(expand);
                }}
              />
            )}
          </SplitPaneRight>
        </SplitPane>
        <Footer />
      </div>
    </Layout>
  );
};

export default PageWrapper;
