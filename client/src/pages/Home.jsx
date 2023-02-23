import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchedText, setSearchedText] = useState("");
  const [searchedResults, setSearchedResult] = useState(null);

  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/v1/posts", {
          method: "GET",
          header: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchedText(e.target.value);
    setTimeout(() => {
      const searchResults = allPosts.filter(
        (post) =>
          post.name.toLowerCase().includes(searchedText.toLocaleLowerCase()) ||
          post.prompt.toLowerCase().includes(searchedText.toLocaleLowerCase())
      );
      setSearchedResult(searchResults);
    }, 500);
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#66e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images by Open AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchedText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            {searchedText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                showing results for
                <span className="text-[#222328] "> {searchedText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchedText ? (
                <RenderCards
                  data={searchedResults}
                  title="no search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Founded" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
