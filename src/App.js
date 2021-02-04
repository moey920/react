import React, { useState } from "react";
import "./style.css";

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.description}
    </article>
  );
}
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={function(e) {
            e.preventDefault();
            props.onChangeMode();
          }}
        >
          WEB
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  var tag = [];
  var d = props.data;
  for (var i = 0; i < d.length; i++) {
    tag.push(
      <li key={d[i].id}>
        <a
          data-id={d[i].id}
          onClick={function(e) {
            e.preventDefault();
            props.onChangeMode(Number(e.target.dataset.id));
          }}
          href={"/" + d[i].id}
        >
          {d[i].title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ul>{tag}</ul>
    </nav>
  );
}
function Create(props) {
  return (
    <form
      onSubmit={function(e) {
        e.preventDefault();
        props.onCreateSubmit({
          title: e.target.title.value,
          description: e.target.description.value
        });
      }}
    >
      <h1>Create</h1>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="description" placeholder="descriptoin" />
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  );
}
function Update() {
  return (
    <form>
      <h1>Update</h1>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="description" placeholder="descriptoin" />
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  );
}
function About() {
  return (
    <article>
      <h2>About</h2>
      우리 사이트는요...
    </article>
  );
}
export default function App() {
  var [mode, setMode] = useState("CREATE");
  var [selectedId, setSelectedId] = useState(null);
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([
    { id: 1, title: "html", description: "html is..." },
    { id: 2, title: "css", description: "css is..." },
    { id: 3, title: "js", description: "js is..." }
  ]);
  var articleTag = null;
  if (mode === "WELCOME") {
    articleTag = <Article title="WELCOME" description="Hello, WEB" />;
  } else if (mode === "READ") {
    for (var i = 0; i < topics.length; i++) {
      var ele = topics[i];
      if (ele.id === selectedId) {
        articleTag = (
          <Article title={ele.title} description={ele.description} />
        );
        break;
      }
    }
  } else if (mode === "CREATE") {
    articleTag = (
      <Create
        onCreateSubmit={function(data) {
          data.id = nextId;
          var newTopics = [...topics];
          newTopics.push(data);
          setTopics(newTopics);
          setNextId(nextId + 1);
          console.log("onCreateSubmit", data, newTopics, nextId);
        }}
      />
    );
  } else if (mode === "UPDATE") {
    articleTag = <Update />;
  } else if (mode === "ABOUT") {
    articleTag = <About />;
  }
  return (
    <div>
      <Header
        onChangeMode={function() {
          console.log("Header");
          setMode("WELCOME");
        }}
      />
      <Nav
        data={topics}
        onChangeMode={function(topic_id) {
          setMode("READ");
          setSelectedId(topic_id);
        }}
      />
      {articleTag}
      <input
        type="button"
        value="Create"
        onClick={function() {
          setMode("CREATE");
        }}
      />
      <input
        type="button"
        value="Update"
        onClick={function() {
          setMode("UPDATE");
        }}
      />
      <input
        type="button"
        value="About"
        onClick={function() {
          setMode("ABOUT");
        }}
      />
    </div>
  );
}
